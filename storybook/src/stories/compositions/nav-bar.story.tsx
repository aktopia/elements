import { NavBar as Component } from '@elements/compositions/nav-bar';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/NavBar',
  component: Component,
};

const store = {
  read: {
    'current.user/id': '2',
    'auth.session/exists': false,
    'auth.sign-in/visible': false,
  },
  dispatch: ['navigate.profile/actions', 'navigate.create/action', 'auth.sign-in/initiate'],
};

export const NavBar = mockStory({
  store,
  render: () => {
    return <Component />;
  },
});
