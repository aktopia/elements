import { Action } from '@elements/compositions/action/action';
import { Profile } from '@elements/compositions/profile/profile';
import { Issue } from '@elements/compositions/issue/issue';
import type { ComponentType } from 'react';
import type { SuspensifyProps } from '@elements/components/suspensify';
import type { Events } from '@elements/store/types';
import { match } from 'path-to-regexp';
import { Home } from '@elements/compositions/home/home';

export interface Route {
  id: string;
  path: string;
  component: ComponentType<SuspensifyProps>;
  onNavigateEvent?: keyof Events;
}

export type RouteWithMatcher = Route & {
  matcher: any;
};

const routes_: Route[] = [
  {
    id: 'home/view',
    path: '/',
    component: Home,
    // onNavigateEvent: 'navigated.action/new',
  },
  {
    id: 'action/new',
    path: '/action/new',
    component: Action,
    onNavigateEvent: 'navigated.action/new',
  },
  {
    id: 'action/view',
    path: '/action/:id',
    component: Action,
    onNavigateEvent: 'navigated.action/view',
  },
  {
    id: 'issue/new',
    path: '/issue/new',
    component: Issue,
    onNavigateEvent: 'navigated.issue/new',
  },
  {
    id: 'issue/view',
    path: '/issue/:id',
    component: Issue,
    onNavigateEvent: 'navigated.issue/view',
  },
  {
    id: 'profile/view',
    path: '/profile/:id',
    component: Profile,
    onNavigateEvent: 'navigated.profile/view',
  },
];

export const routes: RouteWithMatcher[] = routes_.map((route) => {
  return { ...route, matcher: match(route.path) };
});
