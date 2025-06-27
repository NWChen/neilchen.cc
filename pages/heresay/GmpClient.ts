import axios from 'axios';

/**
 * Interface for a POI (Point of Interest) as returned by Google Maps Places API.
 * This is a simplified representation based on your usage.
 */
interface GooglePlace {
  displayName: {
    text: string;
    languageCode?: string; // Optional as it might not always be present or needed
  };
  formattedAddress: string;
  types: string[];
  [key: string]: any; // Allow for other properties not explicitly defined
}

/**
 * Interface for the structure of the searchNearby API response.
 */
interface SearchNearbyResponse {
  places: GooglePlace[];
}

/**
 * Configuration for the Google Maps Platform client functions.
 */
interface GmpConfig {
  apiKey: string;
  url: string;
  headers: Record<string, string>;
}

/**
 * Initializes the configuration for the GMP client functions.
 * @param apiKey Your Google Maps Platform API key.
 * @returns A GmpConfig object.
 */
export function initializeGmpConfig(apiKey: string): GmpConfig {
  const fieldMask = "*"; // Consider making this configurable or more specific for production
  return {
    apiKey,
    url: "https://places.googleapis.com/v1/places:searchNearby",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": fieldMask,
    },
  };
}

/**
 * Performs a search for nearby places using the Google Places API.
 * This is a low-level function that directly interacts with the API.
 *
 * @param config The GmpConfig object containing API key and headers.
 * @param lat Latitude of the center point.
 * @param lng Longitude of the center point.
 * @param radiusMeters Radius in meters for the search circle.
 * @returns A promise that resolves to an array of GooglePlace objects.
 */
async function _searchNearby(
  config: GmpConfig,
  lat: number,
  lng: number,
  radiusMeters: number = 100
): Promise<GooglePlace[]> {
  const data = {
    maxResultCount: 5,
    rankPreference: "POPULARITY",
    locationRestriction: {
      circle: {
        center: { latitude: lat, longitude: lng },
        radius: radiusMeters,
      },
    },
  };

  try {
    const response = await axios.post<SearchNearbyResponse>(config.url, data, {
      headers: config.headers,
    });

    if (response.status !== 200) {
      console.error(
        `Failed to search nearby: ${response.status} ${response.statusText}`
      );
      return [];
    }

    return response.data.places || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `Axios error searching nearby: ${error.message} - Response: ${error.response?.data}`
      );
    } else {
      console.error(`Unknown error searching nearby: ${error}`);
    }
    return [];
  }
}

/**
 * Returns a list of points of interest string prompts in a given frustum.
 * Note: The current implementation searches in a circle, not a frustum,
 * as the 'heading' parameter is not used for this specific API call.
 *
 * @param config The GmpConfig object containing API key and headers.
 * @param lat Latitude of the center point.
 * @param lng Longitude of the center point.
 * @param heading Heading (direction) - currently not used for filtering by frustum in the Google Places API.
 * @returns A promise that resolves to a list of formatted POI strings.
 */
export async function getPoisInFrustum(
  config: GmpConfig,
  lat: number,
  lng: number,
): Promise<string[]> {
  // TODO: fix: right now this is actually getting POIs in a circle centered at
  // the given lat, lng, with a radius of 100 meters.
  // The 'heading' parameter from the Python code was also unused in the actual API request.
  const rawPois = await _searchNearby(config, lat, lng);

  if (!rawPois || rawPois.length === 0) {
    return [];
  }

  const fieldsToInclude: Array<keyof GooglePlace> = [
    "displayName",
    "formattedAddress",
    "types",
  ];

  const pois = rawPois.map((poi) => {
    const filteredPoi: Partial<GooglePlace> = {};
    for (const field of fieldsToInclude) {
      if (poi[field] !== undefined) {
        (filteredPoi as any)[field] = poi[field];
      }
    }
    return filteredPoi as GooglePlace;
  });

  const formattedPois = pois
    .filter(
      (poi) =>
        poi.displayName?.text && poi.types && poi.types.length > 0 && poi.formattedAddress
    )
    .map((poi) => {
      const type = poi.types[0]?.replace(/_/g, " ") || "unknown type";
      return `${poi.displayName.text}, a ${type} located at ${poi.formattedAddress}`;
    });

  return formattedPois;
}