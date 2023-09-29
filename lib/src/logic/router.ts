import { evt, sub } from '@elements/store';
import type { Events as AllEvents } from '@elements/store/types';
import type { ComponentType } from 'react';
import type { SuspensifyProps } from '@elements/components/suspensify';

export enum NavigationState {
  Uninitiated = 'route.navigation.state/uninitiated',
  Initiated = 'route.navigation.state/initiated',
  Complete = 'route.navigation.state/complete',
}

export type Subs = {
  'current.route/id': {
    params: {};
    result: string;
  };
  'current.route.navigation/state': {
    params: {};
    result: NavigationState;
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

export type Events = {
  'route.navigation/complete': {
    params: {};
  };
};

export const routerSlice = () => ({
  'router/state': {
    'route.navigation/state': NavigationState.Uninitiated,
  },
});

sub('current.route/id', ({ state }) => state['router/state']['route/id']);

sub(
  'current.route/on-navigate-event',
  ({ state }) => state['router/state']['route/on-navigate-event']
);
sub('current.route/component', ({ state }) => state['router/state']['route/component']);

sub(
  'current.route.navigation/state',
  ({ state }) => state['router/state']['route.navigation/state']
);

evt('route.navigation/complete', ({ setState }) => {
  setState((state: any) => {
    state['router/state']['route.navigation/state'] = NavigationState.Complete;
  });
});
