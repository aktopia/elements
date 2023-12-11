import type { LatLng, LatLngBounds } from '@elements/components/map';
import type { Evt, Sub } from '@elements/store/types';
import { remoteSub } from '@elements/store/register';

export type Subs = {
  'location.created-by/name': Sub<{ 'location/id': string }, string>;
  'location/created-at': Sub<{ 'location/id': string }, number>;
  'location/address': Sub<{ 'location/id': string }, string>;
  'location/caption': Sub<{ 'location/id': string }, string>;
  'location/lat-lng': Sub<{ 'location/id': string }, LatLng>;
  'location/bounds': Sub<{ 'location/id': string }, LatLngBounds>;
};

export type Events = {
  'location/delete': Evt<{ 'location/id': string }>;
};

export const locationSlice = () => ({
  'location/state': {},
});

remoteSub('location.created-by/name');
remoteSub('location/created-at');
remoteSub('location/address');
remoteSub('location/caption');
remoteSub('location/lat-lng');
remoteSub('location/bounds');
