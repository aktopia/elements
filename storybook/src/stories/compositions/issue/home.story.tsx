import { Home as Component } from '@elements/compositions/issue/home';
import { store } from '@story/stores/issue/home';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/Issue/Home',
  component: Component,
};

export const Home = mockStory<typeof Component>({
  store,
  args: { suspenseLines: 8 },
  render: (args) => {
    return <Component {...args} />;
  },
});
