import { Relationships as Component } from '@elements/compositions/relationships';
import { store } from '@story/stores/relationships';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/Relationships',
  component: Component,
};

const args = {
  refId: '1',
  refAttribute: 'action/id',
  suspense: { lines: 5 },
};

export const Relationships = mockStory({
  store,
  args,
  render: (args) => {
    return <Component {...args} />;
  },
});
