import { dispatch, evt, sub } from '@elements/store';

export type Subs = {
  'app/loading': {
    params: {};
    result: boolean;
  };
};

export type Events = {
  'app.loading/set': {
    params: {
      loading: boolean;
    };
  };
  'app/load': {
    params: {};
  };
};

export const appSlice = () => ({ 'app/state': { 'app/loading': false } });

sub('app/loading', ({ state }) => state['app/state']['app/loading']);

evt('app.loading/set', ({ setState, params }) => {
  setState((state: any) => {
    state['app/state']['app/loading'] = params.loading;
  });
});

evt('app/load', async () => {
  dispatch('app.loading/set', { 'app/loading': true });
  await dispatch('auth.session/sync');
  dispatch('user.chosen.locality/sync');
  dispatch('user.apparent.locality/sync');
  dispatch('app.loading/set', { 'app/loading': false });
});
