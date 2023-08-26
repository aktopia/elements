import { dispatch, evt, setState, sub } from '@elements/store';
import createRouter, { Router, State } from 'router5';
import browserPlugin from 'router5-plugin-browser';
import { routeData } from '@elements/routes';

let router: Router<Record<string, any>>;

export type Subs = {
  'current.route/id': {
    params: {};
    result: string;
  };
  'current.route/loading': {
    params: {};
    result: boolean;
  };
};

export type Events = {
  'current.route.id/set': {
    params: {
      id: string;
    };
  };
};

export const routerSlice = () => ({ 'router/state': {} });

sub('current.route/id', ({ state }) => state['router/state']['route/id']);

sub('current.route/loading', ({ state }) => state['router/state']['route/loading']);

evt('current.route.id/set', ({ setState, params }) => {
  setState((state: any) => {
    state['router/state']['route/id'] = params.id;
  });
});

export interface Route {
  id: string;
  params: Record<string, any>;
  path: string;
}

const listener = async ({ route }: { route: State }) => {
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

  const navigateEvent = routeData[name].onNavigateEvent;

  await dispatch(navigateEvent, { route });

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
