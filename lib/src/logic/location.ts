import { evt, remoteSub } from '@elements/store';
import type { LatLng } from '@elements/components/map';

export type Subs = {
  'location.created-by/name': {
    params: {
      'location/id': string;
    };
    result: string;
  };
  'location/created-at': {
    params: {
      'location/id': string;
    };
    result: number;
  };
  'location/address': {
    params: {
      'location/id': string;
    };
    result: string;
  };
  'location/caption': {
    params: {
      'location/id': string;
    };
    result: string;
  };
  'location/lat-lng': {
    params: {
      'location/id': string;
    };
    result: LatLng;
  };
};

export type Events = {
  'location/delete': {
    params: {
      'location/id': string;
    };
  };
};

export const locationSlice = () => ({
  'location/state': {},
});

remoteSub('location.created-by/name');
remoteSub('location/created-at');
remoteSub('location/address');
remoteSub('location/caption');
remoteSub('location/lat-lng');

evt('location/delete', ({ params }) => {});
