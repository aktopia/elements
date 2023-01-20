import { SaveButton } from '@elements/components/save-button';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Components/SaveButton',
  component: SaveButton,
};

type Story = StoryObj<typeof SaveButton>;

export const Tertiary: Story = {
  args: {
    kind: 'tertiary',
    size: 'xs',
  },
};

export const Saved: Story = {
  args: {
    kind: 'tertiary',
    size: 'xs',
    clicked: true,
  },
};
