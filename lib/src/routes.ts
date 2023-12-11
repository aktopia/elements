import type { ComponentType } from 'react';
import type { SuspensifyProps } from '@elements/components/suspensify';
import type { Events } from '@elements/store/types';
import { match } from 'path-to-regexp';
import Home from '@elements/compositions/home/home';
import Action from '@elements/compositions/action/action';
import Issue from '@elements/compositions/issue/issue';
import Profile from '@elements/compositions/profile/profile';
import Account from '@elements/compositions/account/account';
import Initiatives from '@elements/compositions/meta/initiatives';
import Initiative from '@elements/compositions/meta/initiative';
import PrivacyPolicy from '@elements/compositions/privacy-policy';
import TermsOfService from '@elements/compositions/terms-of-service';
import Contact from '@elements/compositions/contact';

export interface Route {
  id: string;
  path: string;
  component: ComponentType<SuspensifyProps>;
  onNavigateEvent?: keyof Events;
}

export type RouteWithMatcher = Route & {
  matcher: any;
};

export const resolveComponent: Record<string, ComponentType<SuspensifyProps>> = {};

const routes_: Route[] = [
  {
    id: 'home/view',
    path: '/',
    component: Home,
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
  {
    id: 'account/view',
    path: '/account/:id',
    component: Account,
  },
  {
    id: 'meta.initiatives/view',
    path: '/meta/initiatives',
    component: Initiatives,
  },
  {
    id: 'meta.initiative/view',
    path: '/meta/initiative/:id',
    component: Initiative,
    onNavigateEvent: 'navigated.meta.initiative/view',
  },
  {
    id: 'legal/privacy-policy',
    path: '/privacy-policy',
    component: PrivacyPolicy,
  },
  {
    id: 'legal/terms-of-service',
    path: '/terms-of-service',
    component: TermsOfService,
  },
  { id: 'contact', path: '/contact', component: Contact },
];

export const ROUTES: RouteWithMatcher[] = routes_.map((route) => {
  resolveComponent[route.id] = route.component;
  return { ...route, matcher: match(route.path) };
});
