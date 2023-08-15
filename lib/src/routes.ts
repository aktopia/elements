import { Action } from '@elements/compositions/action/action';
import { Profile } from '@elements/compositions/profile/profile';
import { onProfileViewNavigate } from '@elements/logic/profile';

export const routeData = {
  'action/view': {
    component: Action,
    onNavigate: (route: any) => console.log('onNavigate', route),
  },
  'profile/view': { component: Profile, onNavigate: onProfileViewNavigate },
};

export const routes = [
  { name: 'action/view', path: '/action/:id' },
  { name: 'profile/view', path: '/profile/:id/actions' },
];
