import { keep } from '@elements/utils';
import omit from 'lodash/omit';
import type { Route, RouteWithMatcher } from '@elements/routes';
import { routes } from '@elements/routes';
import isEmpty from 'lodash/isEmpty';
import { compile } from 'path-to-regexp';

type Params = Record<string, string>;

type RouteMappings = Record<string, RouteWithMatcher>;

const routeMappings: RouteMappings = routes.reduce((acc: RouteMappings, route) => {
  acc[route.id] = route;
  return acc;
}, {});

export interface Match extends Omit<Route, 'matcher'> {
  path: string;
  pathParams: Params;
  queryParams: Params;
  hash: string;
}

export const events = ['popstate', 'pushState', 'replaceState', 'hashchange'];

if (typeof history !== 'undefined') {
  for (const type of ['pushState', 'replaceState']) {
    // @ts-ignore
    const original = history[type];
    // @ts-ignore
    history[type] = function () {
      const result = original.apply(this, arguments);
      const event = new Event(type);
      // @ts-ignore
      event.arguments = arguments;

      dispatchEvent(event);
      return result;
    };
  }
}

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

export const initRouter = (callback: (match: Match) => any) => {
  callback(resolveRoute(routes));

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
