import { ROUTES, type RouteWithMatcher } from '@elements/routes';
import {
  events,
  getLocation,
  type Match,
  navigateToPath,
  type Params,
} from '@elements/utils/router';
import { keep, scrollToTop } from '@elements/utils';
import omit from 'lodash/omit';
import { compile } from 'path-to-regexp';

type RouteMappings = Record<string, RouteWithMatcher>;

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

export const resolveRoute = (routes: RouteWithMatcher[]): Match => {
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

export const subscribe = (callback: EventListener) => {
  for (const event of events) {
    window.addEventListener(event, callback);
  }

  return () => {
    for (const event of events) {
      window.removeEventListener(event, callback);
    }
  };
};
