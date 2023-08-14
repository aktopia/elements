import { suspensify } from '@elements/components/suspensify';
import { routes } from '@elements/routes';
import { ComponentType } from 'react';
import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';
import { setState, useValue } from '@elements/store';

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

const routes2 = [
  { name: 'action/view', path: '/action/:id' },
  { name: 'profile/view', path: '/profile/:id/actions' },
];

const router = createRouter(routes2, { queryParamsMode: 'loose', allowNotFound: true });

router.usePlugin(browserPlugin());

router.subscribe(({ route }) => {
  setState({ 'router/state': { 'current.route/id': route.name } });
});

router.start();

export const Router = suspensify(() => {
  const routeId = useValue<string>('current.route/id');
  const Component = _routes[routeId];

  if (!Component) {
    console.error('No route found for route name: ', routeId);
    return null;
  }

  return <Component suspenseLines={8} />;
});

/*
TODO
Types for suspense components
 */
