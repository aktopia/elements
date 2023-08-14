import { evt, sub } from '@elements/store/register';

export const alertSlice = () => ({
  'alert/state': {},
});

sub('alert/visible', (_state) => false);
sub('alert/message', (_state) => null);
sub('alert/kind', (_state) => 'info');
evt('alert/dismiss', (_setState, _params) => null);
