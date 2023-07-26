import { debounce, isEmpty } from 'lodash';

function _fetchPredictions(q: any, autoCompleteService: any, callback: any) {
  autoCompleteService
    .getPlacePredictions({ input: q })
    .then((results: any) => (isEmpty(results) ? callback([]) : callback(results.predictions)));
}

const fetchPredictionsDebounced = debounce(_fetchPredictions, 1000);

export const fetchPredictions = (q: any, autoCompleteService: any, callback: any) => {
  if (isEmpty(q)) {
    callback([]);
  } else {
    fetchPredictionsDebounced(q, autoCompleteService, callback);
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
