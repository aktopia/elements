import { TextEditor as Component } from '@elements/compositions/text-editor';
import { mockStory } from '@story/utils/mock-story';
import { lorem } from '@story/utils/string';

export default {
  title: 'Compositions/TextEditor',
  component: Component,
};

const store = {
  read: {
    'current.user/id': '',
    'text-editor/editing': true,
    'text-editor/can-edit': true,
  },
  dispatch: [
    'text-editor.content/update',
    'text-editor.edit/cancel',
    'text-editor.edit/done',
    'text-editor/edit',
  ],
};

const args = {
  refId: '5',
  content: lorem.generateSentences(5),
  refAttr: 'action/id',
  suspense: { lines: 5 },
};

export const TextEditor = mockStory({
  store,
  args,
  render: (args) => {
    return <Component {...args} />;
  },
});
