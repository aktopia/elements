import { evt, sub } from '@elements/store';

export const routerSlice = () => ({ routerState: {} });

sub('current.route/id', ({ state }) => state.routerState.routeId);

evt('current.route.id/set', ({ setState, params }) => {
  setState((state: any) => {
    state.routerState.routeId = params.id;
  });
});
