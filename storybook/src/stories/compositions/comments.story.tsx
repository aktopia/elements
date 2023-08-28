import { Comments as Component } from '@elements/compositions/comments';
import { store } from '@story/stores/comments';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/Comments',
  component: Component,
};

const args = {
  suspenseLines: 5,
  ids: ['comment-1', 'comment-5'],
};

export const Comments = mockStory<typeof Component>({
  store,
  args,
  render: (args) => {
    return <Component {...args} />;
  },
});
