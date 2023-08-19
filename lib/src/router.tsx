import { suspensify } from '@elements/components/suspensify';
import { routeData, routes } from '@elements/routes';
import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';
import { setState, useValue } from '@elements/store';

const router = createRouter(routes, { queryParamsMode: 'loose', allowNotFound: true });

router.usePlugin(browserPlugin());

router.subscribe(({ route }) => {
  const { name, path, params } = route;
  setState((state: any) => {
    state['router/state'] = {
      'route/id': name,
      'route/params': params,
      'route/path': path,
    };
  });
  routeData[name as keyof typeof routeData].onNavigate({ params: params, path: path, id: name });
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
