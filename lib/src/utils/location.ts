import { isEmpty } from 'lodash';
import LatLngBounds = google.maps.LatLngBounds;

const { AutocompleteService } = (await google.maps.importLibrary(
  'places'
)) as google.maps.PlacesLibrary;

const { Geocoder } = (await google.maps.importLibrary('geocoding')) as google.maps.GeocodingLibrary;

const emptyPredictions: any[] = [];

const autoCompleteService = new AutocompleteService();
const geocoderService = new Geocoder();

export interface Prediction {
  placeId: string;
  match: string;
  matchedSubstrings: any[];
}

export interface PlaceDetails {
  location: {
    lat: number;
    lng: number;
  };
  bounds: LatLngBounds;
}

export const fetchPredictions = async (q: string): Promise<Prediction[]> => {
  if (isEmpty(q)) {
    return emptyPredictions;
  } else {
    const results = await autoCompleteService.getPlacePredictions({ input: q });
    return isEmpty(results)
      ? emptyPredictions
      : results.predictions.map((prediction: any) => ({
          placeId: prediction.place_id,
          match: prediction.description,
          matchedSubstrings: prediction.matched_substrings,
        }));
  }
};

export async function fetchPlaceDetails({ placeId }: { placeId: string }): Promise<PlaceDetails> {
  const { results } = await geocoderService.geocode({ placeId });

  const { location, viewport } = results[0].geometry;

  return {
    location: {
      lat: location.lat(),
      lng: location.lng(),
    },
    bounds: viewport,
  };
}

export function calculateBounds(locations: any) {
  const bounds = new window.google.maps.LatLngBounds();
  locations.map((location: any) => {
    bounds.extend(location);
  });
  return bounds;
}

export function getCenter(map: any) {
  const center = map.getCenter();
  const lat = center?.lat();
  const lng = center?.lng();
  return { lat, lng };
}
