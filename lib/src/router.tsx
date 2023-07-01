import { suspensify } from '@elements/components/suspensify';
import { routes } from '@elements/routes';
import { useValue } from '@elements/store';
import { ComponentType } from 'react';

const _routes: Record<string, ComponentType<any>> = {};

function registerRoutes(routeMap: Record<string, ComponentType<any>>) {
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
  const Component = _routes[routeId];

  if (!Component) {
    console.error('No route found for route name: ', routeId);
    return null;
  }

  // TODO Create and show not found page
  return <Component suspense={{ lines: 8 }} />;
});

/*
TODO
Types for suspense components
 */
