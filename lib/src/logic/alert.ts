import { dispatch, evt, sub } from '@elements/store';
import type { Evt, Sub } from '@elements/store/types';

export type Kind = 'info' | 'success' | 'warning' | 'error';

export type Subs = {
  'alert/visible': Sub<{}, boolean>;
  'alert/message': Sub<{}, string>;
  'alert/kind': Sub<{}, Kind>;
};

export type Events = {
  'alert/dismiss': Evt<{}>;
  'alert/flash': Evt<{
    message: string;
    kind: string;
  }>;
};

export const alertSlice = () => ({
  ['alert/state']: { 'alert/visible': false },
});

sub('alert/visible', ({ state }) => state['alert/state']['alert/visible']);
sub('alert/message', ({ state }) => state['alert/state']['alert/message']);
sub('alert/kind', ({ state }) => state['alert/state']['alert/kind']);

evt('alert/dismiss', ({ setState }) => {
  setState((state: any) => {
    state['alert/state']['alert/visible'] = false;
  });
});

evt('alert/flash', ({ setState, params }) => {
  setState((state: any) => {
    state['alert/state']['alert/message'] = params.message;
    state['alert/state']['alert/kind'] = params.kind;
    state['alert/state']['alert/visible'] = true;
    setTimeout(() => {
      dispatch('alert/dismiss');
    }, 7000);
  });
});
