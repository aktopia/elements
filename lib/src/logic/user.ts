import { remoteSub } from '@elements/store';
import type { Sub } from '@elements/store/types';

export const userSlice = () => ({
  'user/state': {},
});

export type Subs = {
  'current.user/id': Sub<{}, string>;
  'current.user/name': Sub<{}, string>;
  'user/name': Sub<{ 'user/id': string }, string>;
  'user/email': Sub<{ 'user/id': string }, string>;
};

remoteSub('current.user/id');
remoteSub('current.user/name');
remoteSub('user/name');
remoteSub('user/email');
remoteSub('user.registration/pending');
