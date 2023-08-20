import { evt, setState, sub } from '@elements/store';
import createRouter, { Router } from 'router5';
import browserPlugin from 'router5-plugin-browser';
import { routeData } from '@elements/routes';

let router: Router<Record<string, any>>;

export const routerSlice = () => ({ 'router/state': {} });

sub('current.route/id', ({ state }) => state['router/state']['route/id']);

sub('current.route/loading', ({ state }) => state['router/state']['route/loading']);

evt('current.route.id/set', ({ setState, params }) => {
  setState((state: any) => {
    state['router/state']['route/id'] = params.id;
  });
});

const listener = async ({ route }: any) => {
  // TODO This listener is bad, redesign it
  const { name, path, params } = route;

  setState((state: any) => {
    state['router/state'] = {
      'route/id': name,
      'route/params': params,
      'route/path': path,
      'route/loading': true,
    };
  });

  await routeData[name as keyof typeof routeData].onNavigate({
    params: params,
    path: path,
    id: name,
  });

  setState((state: any) => {
    state['router/state']['route/loading'] = false;
  });
};

export function initRouter({ routes }: any) {
  const _router = createRouter(routes, { queryParamsMode: 'loose', allowNotFound: true });

  _router.usePlugin(browserPlugin());

  _router.subscribe(listener);

  _router.start();

  router = _router;
}

export const navigate = ({ replace, reload, id, params }: any) => {
  router.navigate(id, params, { replace, reload });
};
