import { Snackbar as Component } from '@elements/components/snackbar';
import { action } from '@storybook/addon-actions';
import type { StoryObj } from '@storybook/react';

export default {
  title: 'Components/Snackbar',
  component: Component,
};

type Story = StoryObj<typeof Component>;

export const Snackbar: Story = {
  args: {
    kind: 'success',
    visible: true,
    message: 'Successfully sent OTP to random@email.com.',
    onDismiss: action('onDismiss'),
  },
};
