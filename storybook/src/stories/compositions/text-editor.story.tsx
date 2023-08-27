import { TextEditor as Component } from '@elements/compositions/text-editor';
import { mockStory } from '@story/utils/mock-story';
import { lorem } from '@story/utils/string';
import { store } from '@story/stores/text-editor';

export default {
  title: 'Compositions/TextEditor',
  component: Component,
};

const noContentText = 'No content yet.';

const args = {
  refId: '5',
  content: lorem.generateSentences(5),
  refAttribute: 'entity/action',
  className: 'text-base text-gray-700',
  suspenseLines: 5,
  placeholder: "What's on your mind?",
  noContent: <p>{noContentText}</p>,
};

export const TextEditor = mockStory<typeof Component>({
  store,
  args,
  render: (args) => {
    return <Component {...args} />;
  },
});
