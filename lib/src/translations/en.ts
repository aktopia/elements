export default {
  'common/outcome': 'something else',
  'common/email': 'Email',
  'common/phone': 'Phone',
  'auth/send-otp': 'Send OTP',
  'auth/sign-in': 'Sign In',
  'auth/wait-to-resend-otp': ({ waitSeconds }: { waitSeconds: number }) =>
    `You can resend OTP in ${waitSeconds} seconds.`,
  'auth/resend-otp': 'Resend OTP',
  'auth/enter-otp': 'Enter OTP',
  'auth/invalid-otp': 'Incorrect OTP, please try again.',
};
