import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import fs from 'fs';
import { GetStaticProps } from 'next/types';
import path from 'path';
import React from 'react';
import { useEffect, useState, useRef } from 'react';

type Position = {
  lat: number;
  lon: number;
}

type PoiRow = {
  name?: string;
  position: Position;
}

type RouteRow = {
  position: Position;
  distanceFromLastPositionMeters: number;
  cumulativeDistanceMeters: number;
}

type PositionDelta = {
  poi: PoiRow | undefined;
  routeRow: RouteRow | undefined;
  currentPosition: Position | undefined;
  distanceInMiles: number;
  etaLowerBound: Date;
  etaUpperBound: Date;
}

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
    Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const findNearestPointInRoute = (
  position: Position,
  route: RouteRow[]
): [RouteRow | undefined, number] => {
  let minDist: number = Infinity;
  let nearestRow: RouteRow | undefined = undefined;

  for (const row of route) {
    const dist = getDistanceFromLatLonInKm(
      position.lat,
      position.lon,
      row.position.lat,
      row.position.lon
    );
    if (dist < minDist) {
      minDist = dist;
      nearestRow = row;
    }
  }

  return [nearestRow, minDist];
};

const getPoiDeltas = (
  position: Position,
  pois: PoiRow[],
  route: RouteRow[],
  paceMinutesPerMile: number,
): PositionDelta[] => {
  // Find the nearest point in route to the current position
  const [nearestToPosition,] = findNearestPointInRoute(position, route);
  if (!nearestToPosition) {
    return [];
  }

  const now = new Date();
  // For each POI, find the nearest point in route and compute the distance in miles
  return pois
    .map((poi) => {
      const [nearestToPoi,] = findNearestPointInRoute(poi.position, route);

      let distanceInMiles = -1;
      if (nearestToPoi) {
        // Compute distance in km, then convert to miles
        distanceInMiles = (nearestToPoi.cumulativeDistanceMeters - nearestToPosition.cumulativeDistanceMeters) * 0.621371 / 1000;
      }

      // Compute ETA lower and upper bounds using getTimeEstimate and current time
      // getPoiDeltas now expects a paceMinutesPerMile argument
      const [etaLowerMinutes, etaUpperMinutes] = getTimeEstimate(distanceInMiles, paceMinutesPerMile);
      const etaLowerBound = new Date(now.getTime() + etaLowerMinutes * 60 * 1000);
      const etaUpperBound = new Date(now.getTime() + etaUpperMinutes * 60 * 1000);

      const delta = {
        poi: poi,
        routeRow: nearestToPosition,
        currentPosition: position,
        distanceInMiles,
        etaLowerBound,
        etaUpperBound,
      };
      return delta;
    })
    .filter(delta => typeof delta.distanceInMiles === 'number' && delta.distanceInMiles > 0);
};

const getTimeEstimate = (
  distanceInMiles: number,
  paceMinutesPerMile: number
): [number, number] => {
  const snapIntervalMinutes = 1;
  const snap = (min: number) => Math.round(min / snapIntervalMinutes) * snapIntervalMinutes;
  const lower = distanceInMiles * paceMinutesPerMile;
  const upper = lower + Math.ceil(distanceInMiles) * 1; // add 1 min per mile for error
  return [snap(lower), snap(upper)];
};

const getDeltasSummary = (deltas: PositionDelta[]): string => {
  // Helper to format Date as h:mm AM/PM
  const formatTime = (date: Date | undefined) => {
    if (!date) return "N/A";
    let h = date.getHours();
    let m = date.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    let hour12 = h % 12;
    if (hour12 === 0) hour12 = 12;
    return `${hour12}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  return [
    deltas.length > 0 && deltas[0].currentPosition
      ? `We're currently here: https://maps.google.com/?q=${deltas[0].currentPosition.lat.toFixed(5)},${deltas[0].currentPosition.lon.toFixed(5)}. Estimated arrival times:`
      : "We're currently here: (unknown location). Estimated arrival times:",
    ...deltas.map(delta => {
      const name = delta.poi?.name ?? "Unknown";
      const distance =
        typeof delta.distanceInMiles === "number" && !isNaN(delta.distanceInMiles)
          ? `${delta.distanceInMiles.toFixed(2)}`
          : "N/A";
      const etaLower = formatTime(delta.etaLowerBound);
      const etaUpper = formatTime(delta.etaUpperBound);
      return `- *${name}*: ${distance}mi away (ETA: ${etaLower}–${etaUpper})`;
    })
  ].join('\n');
};

export default function Slowpoke({ pois, route }: { pois: PoiRow[], route: RouteRow[] }) {
  const [position, setPosition] = useState<Position>();
  const [lastPosition, setLastPosition] = useState<Position | undefined>(undefined);
  const [deltas, setDeltas] = useState<PositionDelta[]>([]);
  const [deltasSummary, setDeltasSummary] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [paceMinutesPerMile, setPaceMinutesPerMile] = useState<number>(10);
  const [copied, setCopied] = React.useState(false);

  // Store previous position in a ref to avoid stale closure
  const prevPositionRef = useRef<Position | undefined>(undefined);

  // Poll for location
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Navigator geolocation not available yet.");
      return;
    }

    // Get immediate fix
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setErrorMessage(undefined);
        const newPosition = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
        setPosition(newPosition);
        // Don't set lastPosition here, as this is the initial position
        console.log(`Initial position: ${newPosition.lat}, ${newPosition.lon}`);
      },
      (err) => {
        console.log(err);
        setErrorMessage(`${err.code}: ${err.message}`);
      },
      {
        enableHighAccuracy: true, // Try for GPS-level data
        timeout: 5000,            // Max wait 5s
        maximumAge: 0,            // No cached position
      }
    );

    // Start watching for updates
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setErrorMessage(undefined);
        const newPosition = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
        // Store the previous position as lastPosition, if there was one
        setLastPosition(prev => position ? { ...position } : prev);
        setPosition(newPosition);
        prevPositionRef.current = newPosition;
        console.log(`Updated position: ${newPosition.lat}, ${newPosition.lon}`);
      },
      (err) => {
        console.log(err);
        setErrorMessage(`${err.code}: ${err.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update lastPosition when position changes (except for initial mount)
  useEffect(() => {
    if (position !== undefined && prevPositionRef.current !== undefined && position !== prevPositionRef.current) {
      setLastPosition(prevPositionRef.current);
    }
    prevPositionRef.current = position;
  }, [position]);

  useEffect(() => {
    if (position == undefined) return;
    const deltas = getPoiDeltas(position, pois, route, paceMinutesPerMile);
    setDeltas(deltas);
    setDeltasSummary(getDeltasSummary(deltas));
  }, [position, paceMinutesPerMile]);

  const handleCopy = async () => {
    if (navigator && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(deltasSummary ?? '');
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch (e) {
        // Optionally handle error
      }
    }
  };


  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <TableContainer component={Paper} sx={{ maxWidth: 400, mx: 'auto', mb: 2 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                Current position
              </TableCell>
              <TableCell align="right">
                {position
                  ? `${position.lat.toFixed(6)}, ${position.lon.toFixed(6)}`
                  : 'unknown'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                Last position
              </TableCell>
              <TableCell align="right">
                {lastPosition
                  ? `${lastPosition.lat.toFixed(6)}, ${lastPosition.lon.toFixed(6)}`
                  : 'none'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                Pace (min/mi)
              </TableCell>
              <TableCell align="right" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                <button
                  style={{
                    width: '2em',
                    height: '2em',
                    fontSize: '1.2em',
                    fontWeight: 'bold',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    background: '#f5f5f5',
                    cursor: 'pointer',
                    marginRight: '0.5em'
                  }}
                  onClick={() => setPaceMinutesPerMile(prev => prev + 1)}
                  aria-label="increment pace"
                  type="button"
                >
                  +
                </button>
                <input
                  type="number"
                  min="0"
                  value={paceMinutesPerMile}
                  onChange={e => {
                    const val = e.target.value;
                    if (val === "") {
                      return 0;
                    }
                    const num = Number(val);
                    const sanitizedNum = isNaN(num) ? 0 : num;
                    setPaceMinutesPerMile(sanitizedNum);
                  }}
                  inputMode="decimal"
                  style={{ width: '4em', textAlign: 'center' }}
                />
                <button
                  style={{
                    width: '2em',
                    height: '2em',
                    fontSize: '1.2em',
                    fontWeight: 'bold',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    background: '#f5f5f5',
                    cursor: 'pointer',
                    marginLeft: '0.5em'
                  }}
                  onClick={() => setPaceMinutesPerMile(prev => Math.max(0, prev - 1))}
                  aria-label="decrement pace"
                  type="button"
                >
                  -
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Text region with "Copy to clipboard" button */}
      <Paper sx={{ maxWidth: 400, mx: 'auto', mb: 2, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Deltas Summary
        </Typography>
        <textarea
          readOnly
          value={deltasSummary}
          style={{
            width: '100%',
            minHeight: '300px',
            resize: 'vertical',
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            boxSizing: 'border-box'
          }}
        />
        {(() => {
          return (
            <button
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                backgroundColor: copied ? '#388e3c' : '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onClick={handleCopy}
            >
              {copied ? 'Copied!' : 'Copy to clipboard'}
            </button>
          );
        })()}
      </Paper>

      {deltas && deltas.length > 0 && (
        <TableContainer component={Paper} sx={{ maxWidth: 600, mx: 'auto', mb: 2 }}>
          <Table size="small" aria-label="deltas table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>POI</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Distance (mi)</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Soonest</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Latest</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deltas.map((delta, idx) => (
                <TableRow key={delta.poi?.name || idx}>
                  <TableCell component="th" scope="row">
                    {delta.poi?.name}
                  </TableCell>
                  <TableCell align="right">
                    {typeof delta.distanceInMiles === 'number'
                      ? delta.distanceInMiles.toFixed(2)
                      : 'N/A'}
                  </TableCell>
                  <TableCell align="right">
                    {delta.etaLowerBound && delta.etaLowerBound instanceof Date
                      ? delta.etaLowerBound.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
                      : 'N/A'}
                  </TableCell>
                  <TableCell align="right">
                    {delta.etaUpperBound && delta.etaUpperBound instanceof Date
                      ? delta.etaUpperBound.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
                      : 'N/A'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

const _parseCsv = (filePath: string): string[][] => {
  const csvContent = fs.readFileSync(filePath, 'utf-8');
  const lines = csvContent
    .split('\n')
    .filter(line => line.trim().length > 0);
  // Skip the first row (header)
  return lines.slice(1).map(line => line.split(','));
};

export const getStaticProps = (async () => {
  const poisPath = path.join(process.cwd(), 'lib', 'pois.csv');
  const routePath = path.join(process.cwd(), 'lib', 'route.csv');
  const pois = _parseCsv(poisPath).map((row: string[]) => {
    return {
      position: {
        lat: parseFloat(row[1]),
        lon: parseFloat(row[2]),
      },
      name: row[0],
    }
  });
  const route: RouteRow[] = _parseCsv(routePath).map((row: string[]) => {
    return {
      position: {
        lat: parseFloat(row[0]),
        lon: parseFloat(row[1]),
      },
      distanceFromLastPositionMeters: parseFloat(row[2]),
      cumulativeDistanceMeters: parseFloat(row[3]),
    } as RouteRow;
  });

  return {
    props: {
      pois,
      route,
    },
  };
}) satisfies GetStaticProps<{ pois: PoiRow[], route: RouteRow[] }>;
