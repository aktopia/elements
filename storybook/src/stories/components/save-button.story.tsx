import { SaveButton as Component } from '@elements/components/save-button';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Components/SaveButton',
  component: Component,
};

type Story = StoryObj<typeof Component>;

export const SaveButton: Story = {
  args: {
    kind: 'tertiary',
    size: 'xs',
  },
};
