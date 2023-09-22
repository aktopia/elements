import { keep } from '@elements/utils';
import omit from 'lodash/omit';
import type { Route, RouteWithMatcher } from '@elements/routes';
import isEmpty from 'lodash/isEmpty';
import { compile } from 'path-to-regexp';

type Params = Record<string, string>;

type RouteMappings = Record<string, RouteWithMatcher>;

let routeMappings: RouteMappings = {};

export interface Match extends Omit<Route, 'matcher'> {
  path: string;
  pathParams: Params;
  queryParams: Params;
  hash: string;
}

export const events = ['popstate', 'pushState', 'replaceState', 'hashchange'];

const subscribe = (callback: EventListener) => {
  for (const event of events) {
    addEventListener(event, callback);
  }

  return () => {
    for (const event of events) {
      removeEventListener(event, callback);
    }
  };
};

const getLocation = () => {
  const queryString = window.location.search;
  const queryParams = Object.fromEntries([...new URLSearchParams(queryString)]);
  const path = window.location.pathname;
  const hash = window.location.hash;

  return { path, hash: isEmpty(hash?.trim()) ? null : hash, queryParams };
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

export const initRouter = (routes: RouteWithMatcher[], callback: (match: Match) => any) => {
  callback(resolveRoute(routes));

  routeMappings = routes.reduce((acc: RouteMappings, route) => {
    acc[route.id] = route;
    return acc;
  }, {});

  return subscribe(() => {
    callback(resolveRoute(routes));
  });
};

export const navigate = (
  id: string,
  { pathParams }: { pathParams: Params },
  { replace = false } = {}
) => {
  const toPath = compile(routeMappings[id].path, { encode: encodeURIComponent });

  const path = toPath(pathParams);

  replace ? history.replaceState(null, '', path) : history.pushState(null, '', path);
};
