import { MainSearch as Component } from '@elements/compositions/main-search';
import { store } from '@story/stores/main-search';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/MainSearch',
  component: Component,
};

const args = {
  suspense: { lines: 5 },
};

export const MainSearch = mockStory({
  store,
  args,
  render: (args) => {
    return <Component {...args} />;
  },
});
