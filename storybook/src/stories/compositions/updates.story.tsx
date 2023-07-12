import { Updates as Component } from '@elements/compositions/updates';
import { store } from '@story/stores/updates';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/Updates',
  component: Component,
};

const args = {
  refId: '1',
  refAttribute: 'action/id',
  suspense: { lines: 5 },
};

export const Updates = mockStory({
  store,
  args,
  render: (args) => {
    return <Component {...args} />;
  },
});
