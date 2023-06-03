import { suspensify } from '@elements/components/suspensify';
import { routes } from '@elements/routes';
import { useValue } from '@elements/store';
import { ReactNode } from 'react';

const _routes: Record<string, ReactNode> = {};

function registerRoutes(routeMap: Record<string, ReactNode>) {
  for (const routeId in routeMap) {
    if (_routes[routeId]) {
      throw Error(`route ${routeId} already registered.`);
    }

    _routes[routeId] = routeMap[routeId];
  }
}

for (const routeMap of routes) {
  registerRoutes(routeMap);
}

export const Router = suspensify(() => {
  const routeId = useValue<string>('current.route/name');
  return <>{_routes[routeId]}</>;
});
