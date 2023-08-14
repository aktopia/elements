import { evt, sub } from '@elements/store';

export const routerSlice = () => ({ 'route/state': {} });

sub('current.route/id', (state) => state['route/state']['current.route/id']);

evt('current.route.id/set', (setState, { id }) => {
  setState({ 'route/state': { 'current.route/id': id } });
});
