import { NavBar as Component } from '@elements/compositions/nav-bar';
import { store as mainSearchStore } from '@story/stores/main-search';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/NavBar',
  component: Component,
};

const store = {
  sub: {
    'current.user/id': '2',
    'auth.session/exists': false,
    'auth.sign-in/visible': false,
    ...mainSearchStore.sub,
    'main-search/visible': false,
  },
  evt: ['auth.sign-in/initiate', 'main-search/open', ...mainSearchStore.evt],
};

export const NavBar = mockStory({
  store,
  render: () => {
    return <Component />;
  },
});
