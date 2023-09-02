import { RichTextArea as Component } from '@elements/components/rich-text-area';
import { action } from '@storybook/addon-actions';
import type { StoryObj } from '@storybook/react';

export default {
  title: 'Components/RichTextArea',
  component: Component,
};

type Story = StoryObj<typeof Component>;

export const RichTextArea: Story = {
  args: {
    className: 'text-gray-700',
    onChange: action('onChange'),
    initialContent: 'Hello World!',
    editable: true,
  },
};
