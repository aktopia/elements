import { SignIn as Component } from '@elements/compositions/sign-in/sign-in';
import { MockStore } from '@story/utils/mock-store';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Compositions/SignIn/SignIn',
  component: Component,
};

const store = {
  read: {
    'auth.sign-in.modal/visible': true,
    'auth.sign-in.modal/sending-otp': false,
    'auth.sign-in.modal/phone': '',
    'auth.sign-in.modal/email': '',
    'auth.sign-in.modal/active-switch-id': 'phone',
  },
  dispatch: [
    'auth.sign-in.modal/send-otp',
    'auth.sign-in.modal/close',
    'auth.sign-in.modal/update-switch',
    'auth.sign-in.modal/update-phone',
    'auth.sign-in.modal/update-email',
  ],
};

type Story = StoryObj<typeof Component>;

export const SignIn: Story = {
  args: store.read,
  render: (args: any) => {
    return (
      <MockStore dispatch={store.dispatch} read={args}>
        <Component />
      </MockStore>
    );
  },
};
