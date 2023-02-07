import { VerifyOtp as Component } from '@elements/compositions/auth/verify-otp';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/Auth/VerifyOtp',
  component: Component,
};

const store = {
  read: {
    'auth.verify-otp/otp': '',
    'auth.verify-otp/visible': true,
    'auth.verify-otp/verifying': false,
    'auth.verify-otp/max-otp-digits': 6,
    'auth.verify-otp/resend-otp-state': 'can-enter',
    'auth.verify-otp/error': null,
    'auth.verify-otp/wait-seconds': 10,
  },
  dispatch: [
    'auth.verify-otp/resend-otp',
    'auth.verify-otp/go-back',
    'auth.verify-otp/close',
    'auth.verify-otp/update-otp',
    'auth.verify-otp/focus-input',
  ],
};

export const VerifyOtp = mockStory({
  store,
  render: () => {
    return <Component />;
  },
});
