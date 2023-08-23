import { sub } from '@elements/store/register';

export const userSlice = () => ({
  'user/state': {
    'current.user/id': 1,
    'current.user/name': 'John Doe',
  },
});

export type Subs = {
  'current.user/id': {
    params: {};
    result: string;
  };
  'current.user/name': {
    params: {};
    result: string;
  };
  'user/name': {
    params: {
      'user/id': string;
    };
    result: string;
  };
};

sub('current.user/id', ({ state }) => state['user/state']['current.user/id']);
sub('current.user/name', ({ state }) => state['user/state']['current.user/name']);
sub('user/name', ({ state }) => state['user/state']['current.user/name']);
