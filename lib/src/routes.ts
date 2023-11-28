import type { ComponentType } from 'react';
import type { SuspensifyProps } from '@elements/components/suspensify';
import type { Events } from '@elements/store/types';
import { match } from 'path-to-regexp';
import { lazy } from 'react';

const Home = lazy(() => import('@elements/compositions/home/home'));
const Action = lazy(() => import('@elements/compositions/action/action'));
const Issue = lazy(() => import('@elements/compositions/issue/issue'));
const Profile = lazy(() => import('@elements/compositions/profile/profile'));
const Account = lazy(() => import('@elements/compositions/account/account'));
const Initiatives = lazy(() => import('@elements/compositions/meta/initiatives'));
const Initiative = lazy(() => import('@elements/compositions/meta/initiative'));
const PrivacyPolicy = lazy(() => import('@elements/compositions/privacy-policy'));
const TermsOfService = lazy(() => import('@elements/compositions/terms-of-service'));
const Contact = lazy(() => import('@elements/compositions/contact'));

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

export const routes: RouteWithMatcher[] = routes_.map((route) => {
  resolveComponent[route.id] = route.component;
  return { ...route, matcher: match(route.path) };
});
