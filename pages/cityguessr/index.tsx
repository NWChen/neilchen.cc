import { Container } from "@mui/material";
import React, { useCallback, useMemo, useRef, useEffect, useState } from "react";
import { GlobeMethods } from "react-globe.gl";

// import dynamic from 'next/dynamic';
// Nextjs consider the import in the page's initial javascript bundle. The package you are using needs to be imported lazily since it is internally using window and document objects, this should not be executed on the server
// const Globe = dynamic(() => import('react-globe.gl').then(mod => ({ default: mod.default })), { ssr: false });

export default function Game() {
  const [cities, setCities] = useState<any[]>([]);
  const [initialCity, setInitialCity] = useState<any>();
  const [globe, setGlobe] = useState<any>();

  // Initialize Globe when window is ready.
  let Globe = () => null;
  if (typeof window !== 'undefined') Globe = require('react-globe.gl').default;
  const globeMethods = useRef<GlobeMethods | undefined>(undefined);

  const flyTo = (lat: number, lng: number) => globeMethods.current?.pointOfView({ lat, lng });

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

  // Choose a random initial city.
  useEffect(() => {
    if (cities.length !== 0) {
      setInitialCity(cities[Math.floor(Math.random() * cities.length)]);
      console.log("initial city: ", initialCity?.properties?.name, initialCity?.properties?.latitude, initialCity?.properties?.longitude);
    }
  }, [cities]);

  useEffect(() => {
    setGlobe(<Globe
      ref={globeMethods}
      globeImageUrl='https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-day.jpg'
      labelsData={cities}
      // waitForGlobeReady={true}
      onGlobeReady={() =>
        flyTo(
          initialCity?.properties?.latitude,
          initialCity?.properties?.longitude
        )
      }

      // TODO: fix typing
      labelLat={(feature: any) => feature?.properties?.latitude}
      labelLng={(feature: any) => feature?.properties?.longitude}
      labelText={(feature: any) => feature?.properties?.name}
    />);
  }, [initialCity, cities, globeMethods]);

  return (
    <Container
      maxWidth={false}
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
      {globe}
    </Container>
  );
}
