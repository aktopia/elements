import { Action } from '@elements/compositions/action/action';
import { Profile } from '@elements/compositions/profile/profile';
import { onProfileViewNavigate } from '@elements/logic/profile';
import { onActionViewNavigate } from '@elements/logic/action';

export const routeData = {
  'action/view': {
    component: Action,
    onNavigate: onActionViewNavigate,
  },
  'profile/view': { component: Profile, onNavigate: onProfileViewNavigate },
};

export const routes = [
  { name: 'action/view', path: '/action/:id' },
  { name: 'profile/view', path: '/profile/:id/actions' },
];
