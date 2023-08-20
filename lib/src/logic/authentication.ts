import { dispatch, evt, sub } from '@elements/store';
import { consumeOtp, sendOtp, sessionExists, signOut } from '@elements/authentication';

export type ResendOtpState = 'idle' | 'waiting' | 'resending';

export const MAX_OTP_DIGITS = 6;

export const authenticationSlice = () => ({
  authenticationState: {
    'current.user/id': '2',
    'user/name': 'Krishna Sunil',
    sessionExists: false,
    signInVisible: false,
    signInEmailInput: '',
    signInSendingOtp: false,
    signInDisallowClose: false,
    verifyOtpInput: '',
    verifyOtpVisible: false,
    verifyOtpVerifying: false,
    verifyOtpResendOtpState: 'idle',
    verifyOtpError: null,
    verifyOtpWaitSeconds: 10,
  },
});

sub('user/name', ({ state }) => state.authenticationState['user/name']);

sub('auth.sign-in/visible', ({ state }) => state.authenticationState.signInVisible);

sub('auth.session/exists', ({ state }) => state.authenticationState.sessionExists);

sub('auth.sign-in/email', ({ state }) => state.authenticationState.signInEmailInput);

sub('current.user/id', ({ state }) => state.authenticationState['current.user/id']);

sub('auth.sign-in/sending-otp', ({ state }) => state.authenticationState.signInSendingOtp);

sub('auth.verify-otp/otp', ({ state }) => state.authenticationState.verifyOtpInput);

sub('auth.verify-otp/visible', ({ state }) => state.authenticationState.verifyOtpVisible);

sub('auth.verify-otp/verifying', ({ state }) => state.authenticationState.verifyOtpVerifying);

sub(
  'auth.verify-otp/resend-otp-state',
  ({ state }) => state.authenticationState.verifyOtpResendOtpState
);

sub('auth.verify-otp/error', ({ state }) => state.authenticationState.verifyOtpError);

sub('auth.verify-otp/wait-seconds', ({ state }) => state.authenticationState.verifyOtpWaitSeconds);

evt('auth.sign-in/initiate', ({ setState }) => {
  setState((state: any) => {
    state.authenticationState.signInVisible = true;
  });
});

evt('auth/sign-out', async ({}) => {
  await signOut();
  dispatch('auth.session/sync');
});

evt('auth.sign-in/send-otp', async ({ setState, params }) => {
  const { email } = params;

  setState((state: any) => {
    state.authenticationState.signInSendingOtp = true;
  });

  await sendOtp({ email });

  dispatch('alert/flash', {
    message: `OTP has been successfully sent to ${email}.`,
    kind: 'success',
  });

  setState((state: any) => {
    state.authenticationState.signInSendingOtp = false;
    state.authenticationState.signInVisible = false;
    state.authenticationState.verifyOtpVisible = true;
  });
});

evt('auth.sign-in/close', ({ setState }) => {
  setState((state: any) => {
    state.authenticationState.signInVisible = false;
  });
});

evt('auth.sign-in/update-email', ({ setState, params }) => {
  setState((state: any) => {
    state.authenticationState.signInEmailInput = params.value;
  });
});

evt('auth.session/sync', async ({ setState }) => {
  const exists = await sessionExists();
  setState((state: any) => {
    state.authenticationState.sessionExists = exists;
  });
});

evt('auth.verify-otp/resend-otp', ({ setState, params }) => {
  setState((state: any) => {
    state.authenticationState.verifyOtpResendOtpState = 'resending';
  });
});

evt('auth.verify-otp/go-back', ({ setState }) => {
  setState((state: any) => {
    state.authenticationState.verifyOtpVisible = false;
    state.authenticationState.signInVisible = true;
    state.authenticationState.verifyOtpInput = '';
  });
});

evt('auth.verify-otp/close', ({ setState }) => {
  setState((state: any) => {
    state.authenticationState.verifyOtpVisible = false;
    state.authenticationState.verifyOtpInput = '';
  });
});

evt('auth.verify-otp/update-otp', ({ setState, params }) => {
  const otp = params.value;
  setState((state: any) => {
    state.authenticationState.verifyOtpInput = otp;
  });

  if (otp.length === MAX_OTP_DIGITS) {
    dispatch('auth.verify-otp/submit-otp', { otp });
  }
});

evt('auth.verify-otp/submit-otp', async ({ setState, params }) => {
  const { otp } = params;
  try {
    setState((state: any) => {
      state.authenticationState.verifyOtpVerifying = true;
    });

    const { user } = await consumeOtp({ otp });

    setState((state: any) => {
      state.authenticationState.verifyOtpVerifying = false;
      state.authenticationState.verifyOtpVisible = false;
      state.authenticationState['current.user/id'] = user.id;
      state.authenticationState.sessionExists = true;
    });

    dispatch('alert/flash', {
      message: 'Welcome! You have successfully signed in.',
      kind: 'success',
    });
  } catch (error) {
    setState((state: any) => {
      state.authenticationState.verifyOtpVerifying = false;
      state.authenticationState.verifyOtpError = error;
    });
  }
});

evt('auth.verify-otp/focus-input', ({ setState, params }) => {});
