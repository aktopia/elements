import { isEmpty } from 'lodash';

const { AutocompleteService } = (await google.maps.importLibrary(
  'places'
)) as google.maps.PlacesLibrary;

const emptyPredictions: any[] = [];

const autoCompleteService = new AutocompleteService();

async function _fetchPredictions(q: string) {
  const results = await autoCompleteService.getPlacePredictions({ input: q });
  return isEmpty(results) ? emptyPredictions : results.predictions;
}

export const fetchPredictions = async (q: string) => {
  if (isEmpty(q)) {
    return emptyPredictions;
  } else {
    return _fetchPredictions(q);
  }
};

export function fetchPlaceDetails({ place_id }: any, placesService: any, callback: any) {
  placesService.getDetails({ placeId: place_id }, (result: any) => {
    const { location, viewport } = result.geometry;
    callback({
      center: {
        lat: location.lat(),
        lng: location.lng(),
      },
      bounds: viewport,
    });
  });
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
