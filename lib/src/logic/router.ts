import { evt, sub } from '@elements/store';

export const routerSlice = () => ({ 'router/state': {} });

sub('current.route/id', ({ state }) => state['router/state']['route/id']);

evt('current.route.id/set', ({ setState, params }) => {
  setState((state: any) => {
    state['router/state']['route/id'] = params.id;
  });
});
