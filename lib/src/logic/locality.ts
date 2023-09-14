import { evt, sub } from '@elements/store';
import type { LatLng } from '@elements/components/map/map';
import { parseClosestLocality, resolveLatLng } from '@elements/utils/location';

interface Locality {
  location: LatLng;
  name: string;
}

export type Subs = {
  'choose-locality.slide-over/visible': {
    params: {};
    result: boolean;
  };
  'user.chosen.locality/location': {
    params: {};
    result: LatLng | undefined;
  };
  'user.chosen.locality/name': {
    params: {};
    result: string | undefined;
  };
};

export type Events = {
  'choose-locality.slide-over/close': {
    params: {};
  };
  'choose-locality.slide-over/open': {
    params: {};
  };
  'choose-locality.location/update': {
    params: { location: LatLng };
  };
  'choose-locality.location/done': {
    params: {};
  };
  'user.chosen.locality/sync': {
    params: {};
  };
};

const getChosenLocality = (): Locality | null => {
  const localityJson = localStorage.getItem('user.chosen/locality');

  if (!localityJson) {
    return null;
  }

  return JSON.parse(localityJson);
};

export const localitySlice = () => ({
  'locality/state': {
    'choose-locality.slide-over/visible': false,
    'choose-locality/location': null,
  },
});

sub(
  'choose-locality.slide-over/visible',
  ({ state }: any) => state['locality/state']['choose-locality.slide-over/visible']
);

sub(
  'user.chosen.locality/location',
  ({ state }: any) => state['locality/state']['user.chosen.locality/location']
);

sub(
  'user.chosen.locality/name',
  ({ state }: any) => state['locality/state']['user.chosen.locality/name']
);

evt('user.chosen.locality/sync', ({ setState }) => {
  const chosenLocality = getChosenLocality();

  setState((state: any) => {
    state['locality/state']['user.chosen.locality/location'] = chosenLocality?.location;
    state['locality/state']['user.chosen.locality/name'] = chosenLocality?.name;
  });
});

evt('choose-locality.slide-over/close', ({ setState }) => {
  setState((state: any) => {
    state['locality/state']['choose-locality.slide-over/visible'] = false;
    state['locality/state']['choose-locality/location'] = null;
  });
});

evt('choose-locality.slide-over/open', ({ setState }) => {
  setState((state: any) => {
    state['locality/state']['choose-locality.slide-over/visible'] = true;
  });
});

evt('choose-locality.location/update', ({ setState, params }) => {
  setState((state: any) => {
    state['locality/state']['choose-locality/location'] = params.location;
  });
});

evt('choose-locality.location/done', async ({ setState, getState }) => {
  const { 'choose-locality/location': location } = getState()['locality/state'];

  setState((state: any) => {
    state['locality/state']['choose-locality.slide-over/visible'] = false;
    state['locality/state']['choose-locality/location'] = null;
  });

  const placeDetails = await resolveLatLng(location);
  const name = parseClosestLocality(placeDetails.addressComponents);
  const chosenLocality = { location, name };

  localStorage.setItem('user.chosen/locality', JSON.stringify(chosenLocality));
});
