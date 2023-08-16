import { dispatch, evt, sub } from '@elements/store';

export const appSlice = () => ({ appState: { loading: false } });

sub('app/loading', ({ state }) => state.appState.loading);

evt('app.loading/set', ({ setState, params }) => {
  setState((state: any) => {
    state.appState.loading = params.loading;
  });
});

evt('app/load', async ({ setState }) => {
  dispatch('app.loading/set', { loading: true });
  await dispatch('auth.session/sync');
  dispatch('app.loading/set', { loading: false });
});
