import { evt, sub } from '@elements/store';

export const routerSlice = () => ({ routerState: {} });

export function setRouteId(state: any, routeId: string) {
  state.routerState.routeId = routeId;
}

sub('current.route/id', ({ state }) => state.routerState.routeId);

evt('current.route.id/set', ({ setState, params }) => {
  setState((state: any) => {
    setRouteId(state, params.id);
  });
});
