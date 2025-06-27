import { Container, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getPoisInFrustum, initializeGmpConfig } from '../../lib/GmpClient';
import { generateContent } from '../../lib/GeminiClient';

type Position = {
  lat: number;
  lon: number;
};

async function fetchPoiString(googleApiKey: string, position: Position) {
  const config = initializeGmpConfig(googleApiKey);
  const pois: string[] = await getPoisInFrustum(config, position!.lat, position!.lon);
  console.log(`Found POI: ${pois[0]}`);
  return pois[0];
}

export default function Heresay() {
  const [geminiApiKey, setGeminiApiKey] = useState<string>('');
  const [googleApiKey, setGoogleApiKey] = useState<string>('');
  const [position, setPosition] = useState<Position>();
  // const [processing, setProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [poi, setPoi] = useState<string | undefined>(undefined);
  const [fact, setFact] = useState<string | undefined>(undefined);

  
  // const [audio, setAudio] = useState<typeof Audio | undefined>(undefined);

  // Set up API clients
  useEffect(() => {
    setGeminiApiKey(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
    setGoogleApiKey(process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '');
  }, []);

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
        setPosition(newPosition);
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
  }, []);

  // Call GMP Places nearbySearch API on changes to position.
  useEffect(() => {
    if (!googleApiKey) {
      console.error("Google API key is undefined or empty.");
      return;
    }
    if (!position) {
      console.error("Position is not available.");
      return;
    }
    fetchPoiString(googleApiKey, position).then(setPoi);
  }, [position, googleApiKey]);

  // Call Gemini on changes to POI.
  useEffect(() => {
    if (!geminiApiKey) {
      console.error("Gemini API key is undefined or empty.");
      return;
    }
    if (!poi) {
      console.error("POI is not available.");
      return;
    }
    generateContent(geminiApiKey, poi).then(setFact);
  }, [poi, geminiApiKey]);

  useEffect(() => {
    if (fact && fact.trim().length > 0) {
      // Cancel any ongoing speech
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      const utterance = new window.SpeechSynthesisUtterance(fact);
      // Optionally, set voice/language here if desired
      window.speechSynthesis.speak(utterance);
    }
  }, [fact]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h1" sx={{ textAlign: 'center' }}>here:say</Typography>
      {errorMessage && (
        <Typography variant="caption" color="error" sx={{ display: 'block', textAlign: 'center', mb: 1 }}>
          {errorMessage}
        </Typography>
      )}

      {position === undefined && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <CircularProgress />
          <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary', textAlign: 'center' }}>
            Loading your position...
          </Typography>
        </Box>
      )}

      {poi && poi.trim().length > 0 ? (
        <Box
          sx={{
            mt: 2,
            mb: 2,
            p: 2,
            border: '2px solid',
            borderColor: 'success.main',
            borderRadius: 2,
            backgroundColor: 'success.light',
            boxShadow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="body1" sx={{ textAlign: 'center', color: 'success.contrastText' }}>
            <b>You're near:</b> {poi}
          </Typography>
        </Box>
      ) : (
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
          No POI information available yet.
        </Typography>
      )}

      <Box
        sx={{
          mt: 3,
          mb: 3,
          p: 3,
          borderRadius: 2,
          backgroundColor: '#FFF9C4', // Use a valid yellow hex code (Material UI yellow[100])
          boxShadow: 2,
          maxWidth: '100%',
        }}
      >
        {fact && fact.trim().length > 0 ? (
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            {fact}
          </Typography>
        ) : (
          <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
            No Gemini response available yet.
          </Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 3 }}>
        <TableContainer component={Paper} sx={{ width: '50%' }}>
          <Table aria-label="Debug">
            <TableHead>
              <TableRow>
                <TableCell><b>Debug value</b></TableCell>
                <TableCell align="right"><b>Status</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Latitude
                </TableCell>
                <TableCell align="right">
                  {position
                    ? position.lat.toFixed(5)
                    : <span style={{ color: 'red' }}>Unknown</span>}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Longitude
                </TableCell>
                <TableCell align="right">
                  {position
                    ? position.lon.toFixed(5)
                    : <span style={{ color: 'red' }}>Unknown</span>}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  GEMINI_API_KEY
                </TableCell>
                <TableCell align="right">
                  {geminiApiKey ? 'Set' : <span style={{ color: 'red' }}>Not set</span>}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  GOOGLE_API_KEY
                </TableCell>
                <TableCell align="right">
                  {googleApiKey ? 'Set' : <span style={{ color: 'red' }}>Not set</span>}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
