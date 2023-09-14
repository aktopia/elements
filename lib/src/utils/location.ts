import { isEmpty } from 'lodash';
import LatLngBounds = google.maps.LatLngBounds;
import type { LatLng } from '@elements/components/map/map';
import GeocoderAddressComponent = google.maps.GeocoderAddressComponent;

const { AutocompleteService, PlacesService } = (await google.maps.importLibrary(
  'places'
)) as google.maps.PlacesLibrary;

const { Geocoder } = (await google.maps.importLibrary('geocoding')) as google.maps.GeocodingLibrary;

const emptyPredictions: any[] = [];

const placesService = new PlacesService(document.createElement('div'));
const autoCompleteService = new AutocompleteService();
const geocoderService = new Geocoder();

export interface Prediction {
  placeId: string;
  match: string;
  matchedSubstrings: any[];
}

export interface LocationDetails {
  location: {
    lat: number;
    lng: number;
  };
  bounds: LatLngBounds;
}

export interface PlaceDetails {
  formattedAddress: string;
  placeId: string;
  addressComponents: GeocoderAddressComponent[];
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

export async function resolvePlaceId(placeId: string): Promise<LocationDetails> {
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

export async function resolveLatLng(latLng: LatLng): Promise<PlaceDetails> {
  const { results } = await geocoderService.geocode({ location: latLng });
  const { formatted_address, place_id, address_components } = results[0];

  placesService.getDetails({ placeId: place_id }, (r) => console.log(r));

  return {
    formattedAddress: formatted_address,
    placeId: place_id,
    addressComponents: address_components,
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

const allowedTypes = [
  'locality',
  'political',
  'street_address',
  'route',
  'intersection',
  'neighborhood',
  'airport',
  'park',
  'point_of_interest',
  'country',
  'sublocality',
  'sublocality_level_1',
  'sublocality_level_2',
  'sublocality_level_3',
  'sublocality_level_4',
  'sublocality_level_5',
  'administrative_area_level_1',
  'administrative_area_level_2',
  'administrative_area_level_3',
  'administrative_area_level_4',
  'administrative_area_level_5',
  'administrative_area_level_6',
  'administrative_area_level_7',
];

export const parseClosestLocality = (addressComponents: GeocoderAddressComponent[]) => {
  const locality = addressComponents.find((component) =>
    component.types.some((type) => allowedTypes.includes(type))
  );

  return locality?.long_name || null;
};
