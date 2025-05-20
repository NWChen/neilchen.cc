import { Autocomplete, Box, Button, Container, Divider, Fade, Grid, IconButton, ListItem, Stack, TextField, Tooltip, Typography } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";
import Header from "../../components/Header";
import HelpIcon from '@mui/icons-material/Help';

const getRandomElement = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

// TODO: get flyto transition animation to work
const FLYTO_TRANSITION_MS = 0;

// Container constants
const CONTAINER_BACKGROUND_COLOR = 'white';
const CONTAINER_WIDTH = '60%';
const CONTAINER_HEIGHT = '60%';

// Label constants
const LABEL_COLOR = 'white';
const LABEL_DOT_RADIUS = 1;
const LABEL_SIZE = 3;

// Approximate radius of earth in miles
const EARTH_RADIUS_MILES = 3958.8;

// Best city constants
const MAX_NORTH_SOUTH_DIFF_DEG = 15;

// Fade-in timeout
const TIMEOUT = 100;

/**
 cat populated_places.geojson| jq '{
  features: (.features | map({
    name: .properties.NAME,
    lat: .properties.lat,
    lng: .properties.lng,
    region: .properties.SOV0NAME
  }))
}
' > cities.geojson
*/
type Feature = {
  name: string;
  region: string;
  lat: number;
  lng: number;
  key?: string;
};

enum ArcType {
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL = 'VERTICAL',
  HYPOTENUSE = 'HYPOTENUSE', // TODO there's a GIS term for this, but I forget what it is
}

type Path = {
  type: ArcType;
  color: string;
  path: number[][];
}

type Score = {
  latDeltaMiles: number;
  lngDeltaMiles: number;
}

// Replace non-ASCII chars in a feature
const featureToAsciiStr = (feature: Feature) =>
  `${feature?.name?.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}, ${feature?.region?.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`

const degToRad = (deg: number) => deg * (Math.PI / 180);

const haversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const dLat = degToRad(lat2 - lat1);
  const dLon = degToRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.floor(EARTH_RADIUS_MILES * c);
}

// Get lat / lng delta, in latitudinal / longitudinal miles
const getLatLngDelta = (startCity: Feature | undefined, endCity: Feature | undefined) => {
  if (!startCity || !endCity) return { latMiles: 0, lngMiles: 0 };
  const latMiles = haversine(startCity.lat, startCity.lng, endCity.lat, startCity.lng);
  const avgLat = (startCity.lat + endCity.lat) / 2;
  const lngMiles = haversine(avgLat, startCity.lng, avgLat, endCity.lng);
  return { latMiles, lngMiles };
}

const getScore = (startCity: Feature, endCity: Feature) => {
  // Normalize latitude difference to a 0-1 range (0 being best)
  const latitudeDifference = Math.abs(startCity.lat - endCity.lat);
  const latitudeScore = 1 - (latitudeDifference / 180);

  // Calculate the shortest longitude difference (0 being worst, 180 being best)
  let longitudeDifference = Math.abs(startCity.lng - endCity.lng);
  if (longitudeDifference > 180) {
    longitudeDifference = 360 - longitudeDifference;
  }
  const longitudeScore = longitudeDifference / 180;

  // Evaluate final score
  const latitudeWeight = 4.0;
  const longitudeWeight = 1.0;
  const combinedScore = (latitudeScore * latitudeWeight + longitudeScore * longitudeWeight) / (latitudeWeight + longitudeWeight);
  return Math.floor(combinedScore * 100);
}

const getBestCity = (startCity: Feature, cities: Feature[]) => {
  let bestCity = {
    feature: {},
    score: 0
  };
  cities.forEach((city) => {
    const score = getScore(startCity, city);
    if (score > bestCity.score && Math.abs(city.lat - startCity.lat) < MAX_NORTH_SOUTH_DIFF_DEG) {
      bestCity = {
        feature: city,
        score: score
      };
    }
  });

  return bestCity;
}

const formatResults = (startCity: Feature, endCity: Feature, results: Score) => {
  if (!startCity || !endCity || !results) return;

  const absScore = {
    latDeltaMiles: Math.abs(results.latDeltaMiles),
    lngDeltaMiles: Math.abs(results.lngDeltaMiles),
  }

  return <Stack spacing={1}>
    <Fade in timeout={TIMEOUT}>
      <Typography><b>{startCity.name}</b> is:</Typography>
    </Fade>
    <Fade in timeout={TIMEOUT * 2}>
      <Typography variant='h3'>
        {absScore.latDeltaMiles} miles <span style={{ color: 'red' }}>(north-south)</span>
      </Typography>
    </Fade>
    <Fade in timeout={TIMEOUT * 3}>
      <Typography variant='h3'>
        {absScore.lngDeltaMiles} miles <span style={{ color: 'blue' }}>(east-west)</span>
      </Typography>
    </Fade>
    <Fade in timeout={TIMEOUT * 4}><Typography>from <b>{endCity.name}</b> (your guess).</Typography></Fade>
  </Stack>
}

// Construct ground-hugging lat/lon arc
const interpolateGraticule = (startCity: Feature, endCity: Feature, type: ArcType): Path | undefined => {
  const NUM_POINTS = 720; // Number of points for a smooth line

  if (type === ArcType.HORIZONTAL) {
    const endCityLng = endCity.lng;
    const startCityLng = startCity.lng;
    // Calculate the raw difference in longitudes
    let longitudeDiff = endCityLng - startCityLng;

    // Adjust the difference if it's greater than 180 degrees (or less than -180)
    if (longitudeDiff > 180) {
      longitudeDiff -= 360;
    } else if (longitudeDiff < -180) {
      longitudeDiff += 360;
    }

    const path = [...Array(NUM_POINTS).keys()].map(i => {
      const longitude = startCity.lng + (i * longitudeDiff / NUM_POINTS);
      return [endCity.lat, longitude];
    });
    return {
      type: ArcType.HORIZONTAL,
      path: path,
      color: 'blue',
    };
  }

  if (type === ArcType.VERTICAL) {
    const latitudeDiff = endCity.lat - startCity.lat;
    const path = [...Array(NUM_POINTS).keys()].map(i => {
      const latitude = startCity.lat + (i * latitudeDiff / NUM_POINTS);
      return [latitude, startCity.lng];
    });
    return {
      type: ArcType.VERTICAL,
      path: path,
      color: 'red',
    };
  }
}

const getGraticules = (startCity: Feature, endCity: Feature) => {
  const graticules = [
    interpolateGraticule(startCity, endCity, ArcType.HORIZONTAL),
    interpolateGraticule(startCity, endCity, ArcType.VERTICAL),
  ];
  return graticules;
}

export default function Game() {
  const [cities, setCities] = useState<Feature[]>([]);
  const [currentCity, setCurrentCity] = useState<Feature>();
  const [startCity, setStartCity] = useState<Feature>();
  const [endCity, setEndCity] = useState<Feature>();
  const [bestCity, setBestCity] = useState<any>();
  const [paths, setPaths] = useState<any>();
  const [results, setResults] = useState<Score>();

  // Initialize Globe when window is ready.
  let Globe = () => null;
  if (typeof window !== 'undefined') Globe = require('react-globe.gl').default;
  const globeMethods = useRef<GlobeMethods | undefined>(undefined);

  const flyTo = (lat: number, lng: number, altitude: number = 2.5) => {
    globeMethods?.current?.pointOfView({ lat, lng, altitude }, FLYTO_TRANSITION_MS);
  };

  // (Re)initialize game
  const start = () => {
    if (cities.length !== 0) {
      const city = getRandomElement(cities);
      setStartCity(city);
      setCurrentCity(city);
      setEndCity(undefined);
      setPaths([]);
    }
  }

  const handleEndCity = (city: Feature | undefined) => {
    if (city && startCity) {
      setCurrentCity(city);
      setEndCity(city);

      setPaths(getGraticules(startCity, city));

      const latLngDelta = getLatLngDelta(startCity, city);
      setResults({
        latDeltaMiles: latLngDelta.latMiles,
        lngDeltaMiles: latLngDelta.lngMiles
      });
    } else {
      setCurrentCity(startCity);
      setEndCity(undefined);
      setResults(undefined);
      setPaths([]);
    }
  }

  // Load cities layer.
  useEffect(() => {
    fetch('/cityguessr/cities.geojson')
      .then(res => res.json())
      .then(({ features }) => {
        // Sort cities alphabetically by name
        setCities(features
          .filter((feature: Feature) => feature.region != 'Indeterminate') // excludes Antarctica
          .sort((a: Feature, b: Feature) => a.name.localeCompare(b.name))

          // Key for disambiguating in components that take a collection
          .map((feature: Feature) => ({
            ...feature,
            key: `${feature.lat},${feature.lng}`
          }))
        )
      })
      .catch(err => {
        console.error("Failed to load cities geojson:", err);
      });
  }, []);

  // Fly to the current city at all times
  useEffect(() => {
    if (currentCity && globeMethods?.current) {
      flyTo(currentCity?.lat, currentCity?.lng);
    }
  }, [currentCity]);

  // Start the game
  useEffect(start, [cities]);

  useEffect(() => {
    var candidate = startCity && cities ? getBestCity(startCity, cities) : undefined;
    if (candidate) {
      const bestLatLngDiff = getLatLngDelta(startCity, candidate.feature as Feature);
      candidate = {
        ...candidate,
        latDiff: Math.abs(bestLatLngDiff.latMiles),
        lngDiff: Math.abs(bestLatLngDiff.lngMiles),
      }
    }
    setBestCity(candidate);
  }, [startCity, endCity, cities]);

  const score = startCity && endCity ? getScore(startCity, endCity) : undefined;
  let scoreColor = '#922b21'; // kind of red
  if (score && score > 80) scoreColor = '#239b56'; // kind of green
  if (score && score > 50 && score <= 80) scoreColor = '#d4ac0d'; // kind of yellow

  console.log(bestCity);

  return (
    <>
      <Header />
      <Grid
        container
        maxWidth='lg'
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ margin: '0 auto' }}
      >
        <Grid size={12} sx={{ paddingBottom: '12px' }}>
          <Divider />
        </Grid>
        <Grid size={4}>
          <Stack spacing={2}>
            <Typography>Guess a city closest to the latitude of <b>{startCity?.name}</b>.</Typography>
            <Typography variant='subtitle2'>(Bonus points if your guess is <i>further</i> in the east-west direction).</Typography>
            {cities.length > 0 && <Autocomplete
              key={startCity?.key} // Setting this key lets us clear the textinput when "Start over" is pressed
              options={cities}
              getOptionLabel={(option: Feature) => `${option.name}, ${option.region}`}
              filterOptions={(options, { inputValue }) =>
                options.filter((option: Feature) =>
                  option.name.toLowerCase().includes(inputValue.toLowerCase())
                )
              }
              sx={{
                zIndex: 10,
                background: 'white'
              }}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.key}>
                    {option.name}, {option.region}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField {...params} label="Your guess" variant="outlined" />
              )}
              onChange={(_, value) => handleEndCity(value ?? undefined)}
              isOptionEqualToValue={(option, value) => option.name === value.name}
            />}
          </Stack>
        </Grid>
        <Grid size={3}>
          {results && formatResults(startCity, endCity, results)}
        </Grid>
        <Grid size={3}>
          {startCity && endCity &&
            <Fade in timeout={TIMEOUT * 5}>
              <Box>
                <Typography display='inline' variant='h3'>
                  Your score: <span style={{ color: scoreColor }}><b>{score}%</b></span>
                </Typography>
                <IconButton size='small'>
                  <Tooltip title='Your score is the weighted average of latitudinal and longitudinal distance. Lower north-south distance and greater east-west distance leads to a higher score.'>
                    <HelpIcon fontSize='small' />
                  </Tooltip>
                </IconButton>

                <Typography>
                  Another option would have been <span style={{ color: 'green' }}><b>{bestCity?.feature.name}, {bestCity?.feature.region}</b></span>, which is {bestCity.latDiff} (north-south) / {bestCity.lngDiff} (east-west) miles away
                </Typography>
              </Box>
            </Fade>
          }
        </Grid>
        <Grid size={2} display='flex' justifyContent='flex-end'>
          <Button
            variant='contained'
            color='primary'
            onClick={start}
            fullWidth={true}
            disabled={endCity === undefined}
            sx={{ textTransform: 'none', zIndex: 10 }}
          >
            <Typography>Start over</Typography>
          </Button>
        </Grid>
        <Grid size={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          {cities.length > 0 && currentCity !== undefined && <Globe
            ref={globeMethods}
            width={CONTAINER_WIDTH}
            height={CONTAINER_HEIGHT}
            backgroundColor={CONTAINER_BACKGROUND_COLOR}

            // TODO: hard mode, dont show image tiles until answer
            globeImageUrl='https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-day.jpg'
            globeOffset={[0, -100]}
            onGlobeReady={() =>
              flyTo(
                currentCity.lat,
                currentCity.lng
              )
            }

            // ringsData={[bestCity]}
            // ringLabel={(bc) => bc.feature.name}
            // ringLat={(bc) => bc.feature.lat}
            // ringLng={(bc) => bc.feature.lng}
            // ringMaxRadius={4}
            pointsData={startCity && endCity && bestCity ? [bestCity] : []}
            pointLat={(bc) => bc.feature.lat}
            pointLng={(bc) => bc.feature.lng}
            pointColor={() => 'green'}
            pointAltitude={0.25}

            pathColor={(path: Path) => path.color}
            pathsData={paths ?? []}
            pathPoints={(path: Path) => path.path}
            pathStroke={3}
            labelColor={() => LABEL_COLOR}
            labelLat={(feature: Feature) => feature.lat}
            labelLng={(feature: Feature) => feature.lng}
            labelSize={LABEL_SIZE}
            labelText={featureToAsciiStr}
            labelDotRadius={LABEL_DOT_RADIUS}
            labelsData={[currentCity]}

            showGraticules={endCity !== undefined}
          />}
        </Grid>
      </Grid>
    </>
  );
}
