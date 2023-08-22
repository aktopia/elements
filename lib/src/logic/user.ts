import { sub } from '@elements/store/register';

export const userSlice = () => ({
  'user/state': {
    'current.user/id': 1,
    'current.user/name': 'John Doe',
  },
});

sub('current.user/id', ({ state }) => state['user/state']['current.user/id']);
sub('current.user/name', ({ state }) => state['user/state']['current.user/name']);
sub('user/name', ({ state }) => state['user/state']['current.user/name']);
