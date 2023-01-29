import { Alert } from '@elements/components/alert';
import React from 'react';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Components/Alert',
  component: Alert,
};

type Story = StoryObj<typeof Alert>;

export const Success: Story = {
  args: {
    kind: 'success',
    show: true,
    messageText: 'Successfully sent OTP to random@email.com.',
    onDismiss: (e: React.MouseEvent) => {
      console.log(e);
    },
  },
};

export const Info: Story = {
  args: {
    ...Success.args,
    kind: 'info',
    messageText: 'Some information',
  },
};

export const Warning: Story = {
  args: {
    ...Success.args,
    kind: 'warning',
    messageText: 'Some information',
  },
};

export const Error: Story = {
  args: {
    ...Success.args,
    kind: 'error',
    messageText: 'Some information',
  },
};
