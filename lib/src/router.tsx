import { suspensify } from '@elements/components/suspensify';
import { routeData, routes } from '@elements/routes';
import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';
import { setState, useValue } from '@elements/store';

const router = createRouter(routes, { queryParamsMode: 'loose', allowNotFound: true });

router.usePlugin(browserPlugin());

router.subscribe(({ route }) => {
  const routeId = route.name as keyof typeof routeData;
  setState((state: any) => {
    state.routerState.routeId = routeId;
  });
  routeData[routeId].onNavigate({ params: route.params, path: route.path, id: routeId });
});

router.start();

export const Router = suspensify(() => {
  const routeId = useValue<keyof typeof routeData>('current.route/id');
  const Component = routeData[routeId].component;

  if (!Component) {
    console.error('No route found for route name: ', routeId);
    // TODO - Show Not found page
    return null;
  }

  return <Component suspenseLines={8} />;
});
