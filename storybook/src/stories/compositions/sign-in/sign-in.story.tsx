import { SignIn as Component } from '@elements/compositions/sign-in/sign-in';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/SignIn/SignIn',
  component: Component,
};

const store = {
  read: {
    'auth.sign-in/visible': true,
    'auth.sign-in/sending-otp': false,
    'auth.sign-in/phone': '',
    'auth.sign-in/email': '',
    'auth.sign-in/active-switch-id': 'phone',
  },
  dispatch: [
    'auth.sign-in/send-otp',
    'auth.sign-in/close',
    'auth.sign-in/update-switch',
    'auth.sign-in/update-phone',
    'auth.sign-in/update-email',
  ],
};

export const SignIn = mockStory({
  store,
  render: () => {
    return <Component />;
  },
});
