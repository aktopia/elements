import { Comments as Component } from '@elements/compositions/comment';
import { store } from '@story/stores/comment';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/Comments',
  component: Component,
};

const args = { suspense: { lines: 5 }, ids: ['comment-1', 'comment-5'] };
export const Comments = mockStory({
  store,
  render: () => {
    return <Component {...args} />;
  },
});
