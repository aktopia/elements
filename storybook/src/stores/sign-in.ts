export const store = {
  read: {
    'auth.sign-in/visible': true,
    'auth.sign-in/sending-otp': false,
    'auth.sign-in/phone': '',
    'auth.sign-in/email': '',
    'auth.sign-in/active-switch-id': 'phone',
  },
  dispatch: [
    'auth.sign-in.google/initiate',
    'auth/sign-out',
    'auth.sign-in/send-otp',
    'auth.sign-in/close',
    'auth.sign-in/update-switch',
    'auth.sign-in/update-phone',
    'auth.sign-in/update-email',
  ],
};
