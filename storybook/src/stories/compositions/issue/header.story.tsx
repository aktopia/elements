import { Header as Component } from '@elements/compositions/issue/header';
import { store } from '@story/stores/issue/header';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/Issue/Header',
  component: Component,
};

export const Header = mockStory({
  store,
  args: { suspenseLines: 8 },
  render: () => {
    return <Component />;
  },
});
