import { Action } from '@elements/compositions/action/action';
import { Profile } from '@elements/compositions/profile/profile';
import type { ComponentType } from 'react';
import type { Events } from '@elements/store/types';

interface RouteData {
  [key: string]: {
    component: ComponentType;
    onNavigateEvent: keyof Events;
  };
}

export const routeData: RouteData = {
  'action/view': {
    component: Action,
    onNavigateEvent: 'navigated.action/view',
  },
  'action/new': {
    component: Action,
    onNavigateEvent: 'navigated.action/new',
  },
  'profile/view': {
    component: Profile,
    onNavigateEvent: 'navigated.profile/view',
  },
};

export const routes = [
  { name: 'action/new', path: '/action/new' },
  { name: 'action/view', path: '/action/:id' },
  { name: 'profile/view', path: '/profile/:id/actions' },
];
