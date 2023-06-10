import { Comment as Component, CommentProps } from '@elements/components/comment';
import { lorem } from '@story/utils/string';
import { action } from '@storybook/addon-actions';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Components/Comment',
  component: Component,
};

const args: CommentProps = {
  id: '1',
  value: lorem.generateSentences(3),
  authorName: 'Krishna Sunil',
  canEdit: true,
  editText: 'Edit',
  editCancelText: 'Cancel',
  editDoneText: 'Done',
  onEditCancel: action('onEditCancel'),
  onEditDone: action('onEditDone'),
  onUpdate: action('onUpdate'),
  subComments: [
    {
      id: '2',
      canEdit: true,
      editText: 'Edit',
      editCancelText: 'Cancel',
      editDoneText: 'Done',
      onEditCancel: action('onEditCancel'),
      onEditDone: action('onEditDone'),
      onUpdate: action('onUpdate'),
      value: lorem.generateSentences(2),
      authorName: 'Madhumitha Sriram',
      subComments: [
        {
          id: '3',
          canEdit: true,
          editText: 'Edit',
          editCancelText: 'Cancel',
          editDoneText: 'Done',
          onEditCancel: action('onEditCancel'),
          onEditDone: action('onEditDone'),
          onUpdate: action('onUpdate'),
          value: lorem.generateSentences(4),
          authorName: 'Sunil KS',
        },
      ],
    },
  ],
};

export const Comment: StoryObj<typeof Component> = {
  args,
  render: (args) => {
    return <Component {...args} />;
  },
};
