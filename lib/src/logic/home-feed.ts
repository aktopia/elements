import type { EntityType } from '@elements/types';
import type { LatLng } from '@elements/components/map';
import type { Sub } from '@elements/store/types';
import { remoteSub } from '@elements/store/register';

export type Subs = {
  'home-feed/list': Sub<
    { 'user.locality/location': LatLng },
    { 'entity/id': string; 'entity/type': EntityType }[]
  >;
};

export const homeFeedSlice = () => ({});

remoteSub('home-feed/list');
