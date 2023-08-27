import { Header as Component } from '@elements/compositions/action/header';
import { store } from '@story/stores/action/header';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/Action/Header',
  component: Component,
};

export const Header = mockStory({
  store,
  args: { suspenseLines: 8 },
  render: () => {
    return <Component />;
  },
});
