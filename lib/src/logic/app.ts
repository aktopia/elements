import type { Evt, Sub } from '@elements/store/types';
import { evt, sub } from '@elements/store/register';

export type Subs = {
  'app/loading': Sub<{}, boolean>;
};

export type Events = {
  'app.loading/set': Evt<{ loading: boolean }>;
  'app/load': Evt<{}>;
};

export const appSlice = () => ({ 'app/state': { 'app/loading': false } });

sub('app/loading', ({ state }) => state['app/state']['app/loading']);

evt('app.loading/set', ({ setState, params }) => {
  setState((state: any) => {
    state['app/state']['app/loading'] = params.loading;
  });
});

evt('app/load', async ({ dispatch }) => {
  dispatch('app.loading/set', { loading: true });
  await dispatch('auth.session/sync');
  dispatch('user.chosen.locality/sync');
  dispatch('user.apparent.locality/sync');
  dispatch('app.loading/set', { loading: false });
});
