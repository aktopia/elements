import { SignIn as Component } from '@elements/compositions/sign-in/sign-in';
import { connectedStory } from '@story/utils/connected-story';

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

export const SignIn = connectedStory({
  store,
  render: () => {
    return <Component />;
  },
});
