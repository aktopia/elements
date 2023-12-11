import { dispatch, evt, sub } from '@elements/store';
import type { Events as AllEvents, Evt, Sub } from '@elements/store/types';
import type { Match, Params } from '@elements/router';
import { events, getLocation, navigateToPath } from '@elements/router';
import isEqual from 'lodash/isEqual';
import { ROUTES, type RouteWithMatcher } from '@elements/routes';
import { keep, scrollToTop } from '@elements/utils';
import omit from 'lodash/omit';
import { compile } from 'path-to-regexp';

type RouteMappings = Record<string, RouteWithMatcher>;

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
  'navigate/route': Evt<{ id: string; pathParams: Params; replace?: boolean }>;
};

const ROUTE_MAPPINGS: RouteMappings = ROUTES.reduce((acc: RouteMappings, route) => {
  acc[route.id] = route;
  return acc;
}, {});

export const generatePath = (id: string, { pathParams }: { pathParams?: Params }) => {
  const toPath = compile(ROUTE_MAPPINGS[id].path, { encode: encodeURIComponent });
  return toPath(pathParams);
};

export const navigateToRoute = (
  id: string,
  { pathParams }: { pathParams?: Params },
  { replace = false } = {}
) => {
  const path = generatePath(id, { pathParams });
  navigateToPath(path, { replace });
  scrollToTop({ behavior: 'auto' });
};

const resolveRoute = (routes: RouteWithMatcher[]): Match => {
  const location = getLocation();

  const matched = keep(routes, (route) => {
    const found = route.matcher(location.path);
    return found ? omit({ ...route, pathParams: found.params }, ['matcher']) : null;
  });

  return {
    ...location,
    ...matched,
  };
};

const subscribe = (callback: EventListener) => {
  for (const event of events) {
    window.addEventListener(event, callback);
  }

  return () => {
    for (const event of events) {
      window.removeEventListener(event, callback);
    }
  };
};

export const initRouter = () => {
  dispatch('route.navigation/initiate', resolveRoute(ROUTES));

  return subscribe(() => {
    dispatch('route.navigation/initiate', resolveRoute(ROUTES));
  });
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

evt('route.navigation/initiate', async ({ setState, params, getState }) => {
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
