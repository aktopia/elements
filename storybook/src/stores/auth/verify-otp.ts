export const store = {
  read: {
    'auth.verify-otp/otp': '',
    'auth.verify-otp/visible': true,
    'auth.verify-otp/verifying': false,
    'auth.verify-otp/resend-otp-state': 'idle',
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
