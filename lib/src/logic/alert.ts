import { evt, sub } from '@elements/store/register';

export const alertSlice = () => ({
  'alert/state': {},
});

sub('alert/visible', ({ state }) => false);
sub('alert/message', ({ state }) => null);
sub('alert/kind', ({ state }) => 'info');
evt('alert/dismiss', ({ setState, params }) => null);
