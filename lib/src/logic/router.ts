import { evt, sub } from '@elements/store';

export const routerSlice = () => ({ 'router/state': {} });

sub('current.route/id', (state) => state['router/state']['current.route/id']);

evt('current.route.id/set', (setState, { id }) => {
  setState({ 'router/state': { 'current.route/id': id } });
});
