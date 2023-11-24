import { ActionHome as Component } from '@elements/compositions/action/action-home';
import { store } from '@story/stores/action/home';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/Action/Home',
  component: Component,
};

export const Home = mockStory({
  store,
  args: { suspense: { lines: 8 } },
  render: (args) => {
    return <Component {...args} />;
  },
});
