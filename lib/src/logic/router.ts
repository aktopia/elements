import type { Events as AllEvents, Evt, Sub } from '@elements/store/types';
import type { Match, Params } from '@elements/utils/router';
import { navigateToPath } from '@elements/utils/router';
import isEqual from 'lodash/isEqual';
import { navigateToRoute } from '@elements/router';
import { evt, sub } from '@elements/store/register';

export enum NavigationState {
  Uninitiated = 'route.navigation.state/uninitiated',
  Initiated = 'route.navigation.state/initiated',
  Complete = 'route.navigation.state/complete',
}

export type Subs = {
  'current.route/id': Sub<{}, string>;
  'route.navigation/state': Sub<{}, NavigationState>;
  'current.route/on-navigate-event': Sub<{}, keyof AllEvents>;
};

export type Events = {
  'route.navigation/initiate': Evt<Match>;
  'route.navigation/complete': Evt<{}>;
  'navigate/path': Evt<{ path: string; replace?: boolean }>;
  'navigate/route': Evt<{ id: string; pathParams?: Params; replace?: boolean }>;
};

export const routerSlice = () => ({
  'router/state': {
    'route.navigation/state': NavigationState.Uninitiated,
  },
});

sub('current.route/id', ({ state }) => state['router/state']['route/id']);

sub(
  'current.route/on-navigate-event',
  ({ state }) => state['router/state']['route/on-navigate-event']
);

sub('route.navigation/state', ({ state }) => state['router/state']['route.navigation/state']);

const routeChanged = (currentState: any, newMatch: Match) => {
  return (
    !isEqual(currentState['route/id'], newMatch.id) ||
    !isEqual(currentState['route/path'], newMatch.path) ||
    !isEqual(currentState['route/path-params'], newMatch.pathParams) ||
    !isEqual(currentState['route/query-params'], newMatch.queryParams) ||
    !isEqual(currentState['route/hash-params'], newMatch.hashParams)
  );
};

evt('route.navigation/initiate', async ({ setState, params, getState, dispatch }) => {
  const { id, pathParams, queryParams, hashParams, path, onNavigateEvent } = params;
  const navigationState = getState()['router/state']['route.navigation/state'];
  const navigationUninitiated = navigationState === NavigationState.Uninitiated;
  const navigationInitiated = navigationState === NavigationState.Initiated;
  const navigationComplete = navigationState === NavigationState.Complete;
  const hasRouteChanged = routeChanged(getState()['router/state'], params);
  const shouldNavigate =
    navigationUninitiated || ((navigationInitiated || navigationComplete) && hasRouteChanged);

  if (!shouldNavigate) {
    return;
  }

  setState((state: any) => {
    state['router/state'] = {
      'route/id': id,
      'route/path-params': pathParams,
      'route/query-params': queryParams,
      'route/hash-params': hashParams,
      'route/path': path,
      'route.navigation/state': NavigationState.Initiated,
    };
  });

  if (onNavigateEvent) {
    await dispatch(onNavigateEvent, { route: params });
    // You should dispatch 'route.navigation/complete' whenever all the logic is done your handler
  } else {
    dispatch('route.navigation/complete');
  }
});

evt('route.navigation/complete', ({ setState }) => {
  setState((state: any) => {
    state['router/state']['route.navigation/state'] = NavigationState.Complete;
  });
});

evt('navigate/route', ({ params }) => {
  const { id, replace, ...otherParams } = params;
  navigateToRoute(id, otherParams, { replace });
});

evt('navigate/path', ({ params }) => {
  const { path, replace } = params;
  navigateToPath(path, { replace });
});
