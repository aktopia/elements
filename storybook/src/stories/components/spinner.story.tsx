import { Spinner } from '@elements/components/spinner';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Components/Spinner',
  component: Spinner,
};

type Story = StoryObj<typeof Spinner>;

export const Primary: Story = {
  args: {
    show: true,
    kind: 'primary',
    size: 'sm',
  },
};
