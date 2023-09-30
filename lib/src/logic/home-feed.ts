import type { EntityType } from '@elements/types';
import { remoteSub } from '@elements/store';
import type { LatLng } from '@elements/components/map';

export type Subs = {
  'home-feed/list': {
    params: { 'user.locality/location': LatLng };
    result: { 'entity/id': string; 'entity/type': EntityType }[];
  };
};

export const homeFeedSlice = () => ({});

remoteSub('home-feed/list');
