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

type Arc = {
  type: ArcType;
  color: string;
  altitude?: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
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

// Get lat / lng delta, in latitudinal / longitudinal miles
const getLatLngDelta = (city1: Feature | undefined, city2: Feature | undefined) => {
  if (!city1 || !city2) return { latMiles: 0, lngMiles: 0 };

  const toRadians = (deg: number) => deg * (Math.PI / 180);

  // lat difference in miles
  const latDiff = city2.lat - city1.lat;
  const avgLat = (city1.lat + city2.lat) / 2;
  const latMiles = latDiff * (Math.PI / 180) * EARTH_RADIUS_MILES;

  // lng difference in miles (adjusted by lat)
  const lngDiff = city2.lng - city1.lng;
  const lngMiles = lngDiff * (Math.PI / 180) * EARTH_RADIUS_MILES * Math.cos(toRadians(avgLat));

  return { latMiles: Math.floor(latMiles), lngMiles: Math.floor(lngMiles) };
}

const getScore = (startCity: Feature, endCity: Feature) => {
  // Reward lower north-south distance
  const northSouthWeight = 2.0;
  const northSouthScore = (180 - Math.abs(endCity.lat - startCity.lat)) / 180;

  // Reward higher east-west distance
  const eastWestWeight = 1.0;
  const eastWestScore = Math.min(
    Math.abs(endCity.lng - startCity.lng), Math.abs(startCity.lng - endCity.lng)
  ) / 180;

  // Weighted average of scores
  return Math.floor(100 *
    (northSouthWeight * northSouthScore + eastWestWeight * eastWestScore)
    / (northSouthWeight + eastWestWeight));
}

const getBestCity = (startCity: Feature, cities: Feature[]) => {
  const targetLat = startCity.lat;
  const targetLng = (startCity.lng + 180) % 180;

  let bestCity = {
    feature: {},
    score: 0
  };
  cities.forEach((city) => {
    const score = getScore(startCity, city);
    if (score > bestCity.score) {
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

  if (type === ArcType.VERTICAL) {
    const path = [...Array(NUM_POINTS).keys()].map(i => {
      // const longitude = -180 + (360 / NUM_POINTS) * i; // From -180 to 180
      const longitudeDiff = endCity.lng - startCity.lng;
      const longitude = startCity.lng + (i * longitudeDiff / NUM_POINTS);
      return [endCity.lat, longitude];
    });
    return {
      type: ArcType.VERTICAL,
      path: path,
      color: 'blue',
    };
  }

  if (type === ArcType.HORIZONTAL) {
    const path = [...Array(NUM_POINTS).keys()].map(i => {
      const latitudeDiff = endCity.lat - startCity.lat;
      const latitude = startCity.lat + (i * latitudeDiff / NUM_POINTS);
      return [latitude, startCity.lng];
    });
    return {
      type: ArcType.HORIZONTAL,
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

  var bestCity = startCity && cities ? getBestCity(startCity, cities) : undefined;
  if (bestCity) {
    const bestLatLngDiff = getLatLngDelta(startCity, bestCity.feature as Feature);
    bestCity = {
      ...bestCity,
      latDiff: Math.abs(bestLatLngDiff.latMiles),
      lngDiff: Math.abs(bestLatLngDiff.lngMiles),
    }
  }

  const score = startCity && endCity ? getScore(startCity, endCity) : undefined;
  let scoreColor = '#922b21'; // kind of red
  if (score && score > 80) scoreColor = '#239b56'; // kind of green
  if (score && score > 50 && score <= 80) scoreColor = '#d4ac0d'; // kind of yellow

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
                  option.name.toLowerCase().startsWith(inputValue.toLowerCase())
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
            <Fade in timeout={TIMEOUT}>
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
                  The best option would have been <b>{bestCity?.feature.name}, {bestCity?.feature.region}</b>, which is {bestCity.latDiff} (north-south) / {bestCity.lngDiff} (east-west) miles away
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
            globeImageUrl='https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-day.jpg'
            globeOffset={[0, -100]}
            onGlobeReady={() =>
              flyTo(
                currentCity.lat,
                currentCity.lng
              )
            }

            // TODO: fix typing
            pathColor={(path: Path) => path.color}
            pathsData={paths ?? []}
            pathPoints={(path: Path) => path.path}
            pathStroke={3}
            // arcColor={(arc: Arc) => arc.color}
            // arcsData={arcs ?? []}
            // arcStroke={1}

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
