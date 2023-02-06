import { routeMaps } from '@elements/routes';
import { useValue } from '@elements/store';
import { memo, ReactNode } from 'react';

const _routes: Record<string, ReactNode> = {};

export function registerRoutes(routeMap: Record<string, ReactNode>) {
  for (const routeId in routeMap) {
    if (_routes[routeId]) {
      throw Error(`route ${routeId} already registered.`);
    }

    _routes[routeId] = routeMap[routeId];
  }
}

for (const routeMap of routeMaps) {
  registerRoutes(routeMap);
}

export const Router = memo(() => {
  const routeId = useValue<string>('current.route/id');
  return <>{_routes[routeId]}</>;
});
