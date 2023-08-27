export const store = {
  sub: {
    'auth.sign-in/visible': true,
    'auth.sign-in/sending-otp': false,
    'auth.sign-in/email': '',
  },
  evt: [
    'auth/sign-out',
    'auth.sign-in/send-otp',
    'auth.sign-in/close',
    'auth.sign-in/update-email',
  ],
};
