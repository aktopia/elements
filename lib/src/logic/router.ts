import { sub } from '@elements/store';
import type { Events as AllEvents } from '@elements/store/types';
import type { ComponentType } from 'react';
import type { SuspensifyProps } from '@elements/components/suspensify';

export type Subs = {
  'current.route/id': {
    params: {};
    result: string;
  };
  'current.route/loading': {
    params: {};
    result: boolean;
  };
  'current.route/on-navigate-event': {
    params: {};
    result: keyof AllEvents;
  };
  'current.route/component': {
    params: {};
    result: ComponentType<SuspensifyProps>;
  };
};

export type Events = {};

export const routerSlice = () => ({
  'router/state': {
    'route/loading': true,
  },
});

sub('current.route/id', ({ state }) => state['router/state']['route/id']);

sub(
  'current.route/on-navigate-event',
  ({ state }) => state['router/state']['route/on-navigate-event']
);
sub('current.route/component', ({ state }) => state['router/state']['route/component']);

sub('current.route/loading', ({ state }) => state['router/state']['route/loading']);
