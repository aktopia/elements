import { Header as Component } from '@elements/compositions/header';
import { store } from '@story/stores/header';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/Header',
  component: Component,
};

// TODO Better story to test router
export const Header = mockStory({
  store,
  render: () => {
    return <Component />;
  },
});
