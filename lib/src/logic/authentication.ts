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

sub('user/name', ({ state }) => state.authenticationState['user/name']);

sub('auth.sign-in/visible', ({ state }) => state.authenticationState.signInVisible);

sub('auth.session/exists', ({ state }) => state.authenticationState.sessionExists);

sub('auth.sign-in/email', ({ state }) => state.authenticationState.signInEmailInput);

sub('current.user/id', ({ state }) => state.authenticationState['current.user/id']);

sub('auth.sign-in/sending-otp', ({ state }) => state.authenticationState.signInSendingOTP);

evt('auth.sign-in/initiate', ({ setState }) => {
  setState((state: any) => {
    state.authenticationState.signInVisible = true;
  });
});

evt('auth/sign-out', ({ setState, params }) => null);

evt('auth.sign-in/send-otp', ({ setState, params }) => null);

evt('auth.sign-in/close', ({ setState }) => {
  setState((state: any) => {
    state.authenticationState.signInVisible = false;
  });
});

evt('auth.sign-in/update-email', ({ setState, params }) => null);
