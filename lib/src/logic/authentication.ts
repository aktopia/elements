import { evt, sub } from '@elements/store';

export const authenticationSlice = () => ({
  authenticationState: {
    'user/name': 'Krishna Sunil',
    signInVisible: false,
    sessionExists: false,
    signInEmailInput: '',
    'current.user/id': '2',
    'auth.sign-in/phone': '',
    'auth.sign-in/active-switch-id': 'phone',
    signInSendingOTP: false,
    signInDisallowClose: false,
  },
});

sub('user/name', (state) => state.authenticationState['user/name']);

sub('auth.sign-in/visible', (state) => state.authenticationState.signInVisible);

sub('auth.session/exists', (state) => state.authenticationState.sessionExists);

sub('auth.sign-in/email', (state) => state.authenticationState.signInEmailInput);

sub('current.user/id', (state) => state.authenticationState['current.user/id']);

sub('auth.sign-in/phone', (state) => state.authenticationState['auth.sign-in/phone']);

sub(
  'auth.sign-in/active-switch-id',
  (state) => state.authenticationState['auth.sign-in/active-switch-id']
);

sub('auth.sign-in/sending-otp', (state) => state.authenticationState.signInSendingOTP);

evt('auth.sign-in/initiate', (_setState, _params) => null);

evt('auth.sign-in.google/initiate', (_setState, _params) => null);

evt('auth/sign-out', (_setState, _params) => null);

evt('auth.sign-in/send-otp', (_setState, _params) => null);

evt('auth.sign-in/close', (_setState, _params) => null);

evt('auth.sign-in/update-switch', (_setState, _params) => null);

evt('auth.sign-in/update-phone', (_setState, _params) => null);

evt('auth.sign-in/update-email', (_setState, _params) => null);
