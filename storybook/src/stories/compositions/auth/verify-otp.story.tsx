import { VerifyOtp as Component } from '@elements/compositions/auth/verify-otp';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/Auth/VerifyOtp',
  component: Component,
};

const store = {
  read: {
    'auth.enter-otp/otp': '',
    'auth.enter-otp/visible': true,
    'auth.enter-otp/verifying': false,
    'auth.enter-otp/max-otp-digits': 6,
    'auth.enter-otp/resend-otp-state': 'can-enter',
    'auth.enter-otp/error': null,
    'auth.enter-otp/wait-seconds': 10,
  },
  dispatch: [
    'auth.enter-otp/resend-otp',
    'auth.enter-otp/go-back',
    'auth.enter-otp/close',
    'auth.enter-otp/update-otp',
    'auth.enter-otp/focus-input',
  ],
};

export const VerifyOtp = mockStory({
  store,
  render: () => {
    return <Component />;
  },
});
