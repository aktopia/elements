import { NavBar as Component } from '@elements/compositions/nav-bar';
import { store } from '@story/stores/nav-bar';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/NavBar',
  component: Component,
};

export const NavBar = mockStory({
  args: { suspenseLines: 8 },
  store,
  render: () => {
    return <Component />;
  },
});
