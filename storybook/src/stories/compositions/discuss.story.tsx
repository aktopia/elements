import { Discuss as Component } from '@elements/compositions/discuss';
import { store } from '@story/stores/comments';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/Discuss',
  component: Component,
};

const args = {
  suspense: { lines: 5 },
  refId: '1',
  refAttribute: 'entity.type/action',
};
export const Discuss = mockStory({
  store,
  render: () => {
    return <Component {...args} />;
  },
});
