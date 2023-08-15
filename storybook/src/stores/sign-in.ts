export const store = {
  read: {
    'auth.sign-in/visible': true,
    'auth.sign-in/sending-otp': false,
    'auth.sign-in/email': '',
  },
  dispatch: [
    'auth/sign-out',
    'auth.sign-in/send-otp',
    'auth.sign-in/close',
    'auth.sign-in/update-email',
  ],
};
