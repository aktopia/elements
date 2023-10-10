import { dispatch, evt, sub } from '@elements/store';
import type { Events as AllEvents } from '@elements/store/types';
import type { ComponentType } from 'react';
import type { SuspensifyProps } from '@elements/components/suspensify';
import type { Match, Params } from '@elements/router';
import { navigateToPath, navigateToRoute } from '@elements/router';

export enum NavigationState {
  Uninitiated = 'route.navigation.state/uninitiated',
  Initiated = 'route.navigation.state/initiated',
  Complete = 'route.navigation.state/complete',
}

export type Subs = {
  'current.route/id': {
    params: {};
    result: string;
  };
  'route.navigation/state': {
    params: {};
    result: NavigationState;
  };
  'current.route/on-navigate-event': {
    params: {};
    result: keyof AllEvents;
  };
  'current.route/component': {
    params: {};
    result: ComponentType<SuspensifyProps>;
  };
};

export type Events = {
  'route.navigation/initiate': {
    params: Match;
  };
  'route.navigation/complete': {
    params: {};
  };
  'navigate/path': {
    params: { path: string; replace?: boolean };
  };
  'navigate/route': {
    params: { id: string; pathParams: Params; replace?: boolean };
  };
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

sub('current.route/component', ({ state }) => state['router/state']['route/component']);

sub('route.navigation/state', ({ state }) => state['router/state']['route.navigation/state']);

const routeChanged = (currentState: any, newMatch: Match) => {
  return (
    currentState['route/id'] !== newMatch.id ||
    currentState['route/path'] !== newMatch.path ||
    currentState['route/path-params'] !== newMatch.pathParams ||
    currentState['route/query-params'] !== newMatch.queryParams ||
    currentState['route/hash-params'] !== newMatch.hashParams
  );
};

evt('route.navigation/initiate', async ({ setState, params, getState }) => {
  const { id, pathParams, queryParams, hashParams, component, path, onNavigateEvent } = params;
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
      'route/component': component,
      'route/path': path,
      'route.navigation/state': NavigationState.Initiated,
    };
  });

  if (onNavigateEvent) {
    await dispatch(onNavigateEvent, { route: params });
    // dispatch 'route.navigation/complete' whenever all the logic is done
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
