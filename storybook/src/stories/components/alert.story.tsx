import { Alert as Component } from '@elements/components/alert';
import { action } from '@storybook/addon-actions';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Components/Alert',
  component: Component,
};

type Story = StoryObj<typeof Component>;

export const Alert: Story = {
  args: {
    kind: 'success',
    show: true,
    messageText: 'Successfully sent OTP to random@email.com.',
    onDismiss: action('onDismiss'),
  },
};
