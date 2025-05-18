import { Button, Container, Typography } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import { GlobeMethods } from "react-globe.gl";

const getRandomElement = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

/**
 * 1. get only the current city to be labeled
 * 2. show lat lines 
 * 3. show lat lines only when user provides answer
 */

// TODO: get flyto transition animation to work
const FLYTO_TRANSITION_MS = 0;

// Label constants
const LABEL_COLOR = 'white';
const LABEL_DOT_RADIUS = 1;
const LABEL_SIZE = 3;

export default function Game() {
  const [cities, setCities] = useState<any[]>([]);
  const [currentCity, setCurrentCity] = useState<any>();

  // Initialize Globe when window is ready.
  let Globe = () => null;
  if (typeof window !== 'undefined') Globe = require('react-globe.gl').default;
  const globeMethods = useRef<GlobeMethods | undefined>(undefined);

  const flyTo = (lat: number, lng: number, altitude: number = 1.5) =>
    globeMethods?.current?.pointOfView({ lat, lng, altitude }, FLYTO_TRANSITION_MS);

  const onNewCurrentCity = () => {
    if (cities.length !== 0) {
      const city = getRandomElement(cities);
      setCurrentCity(city);
    }
  }

  // Load cities layer.
  useEffect(() => {
    fetch('/cityguessr/cities.geojson')
      .then(res => res.json())
      .then(({ features }) => {
        setCities(features);
      })
      .catch(err => {
        console.error("Failed to load cities geojson:", err);
      });
  }, []);

  // Fly to the current city at all times
  useEffect(() => {
    if (currentCity && globeMethods?.current) {
      flyTo(currentCity?.properties?.latitude, currentCity?.properties?.longitude);
    }
  }, [currentCity]);

  // Choose a random initial city.
  useEffect(onNewCurrentCity, [cities]);

  return (
    <Container
      maxWidth={true}
      disableGutters
      sx={{
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 0,
        m: 0,
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={onNewCurrentCity}
        sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10, textTransform: "none" }}
      >
        <Typography>Take me to a new city
        </Typography>
      </Button>
      {cities.length > 0 && currentCity !== undefined && <Globe
        ref={globeMethods}
        globeImageUrl='https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-day.jpg'
        labelsData={[currentCity]}
        // labelsData={cities}
        // animateIn={true}
        onGlobeReady={() =>
          flyTo(
            currentCity?.properties?.latitude,
            currentCity?.properties?.longitude
          )
        }
        // TODO: fix typing
        labelColor={() => LABEL_COLOR}
        labelDotRadius={LABEL_DOT_RADIUS}
        labelLat={(feature: any) => feature?.properties?.latitude}
        labelLng={(feature: any) => feature?.properties?.longitude}
        labelSize={LABEL_SIZE}
        labelText={(feature: any) => feature?.properties?.name}
      />}
    </Container>
  );
}
