import { evt, sub } from '@elements/store';

export const authenticationSlice = () => ({
  'authentication/state': {
    'user/name': 'Krishna Sunil',
    'auth.sign-in/visible': false,
    'auth.session/exists': false,
    'auth.sign-in/email': '',
    'current.user/id': '2',
    'auth.sign-in/phone': '',
    'auth.sign-in/active-switch-id': 'phone',
    'auth.sign-in/sending-otp': false,
    'auth.sign-in/disallow-close': false,
  },
});

sub('user/name', (state) => state['authentication/state']['user/name']);

sub('auth.sign-in/visible', (state) => state['authentication/state']['auth.sign-in/visible']);

sub('auth.session/exists', (state) => state['authentication/state']['auth.session/exists']);

sub('auth.sign-in/email', (state) => state['authentication/state']['auth.sign-in/email']);

sub('current.user/id', (state) => state['authentication/state']['current.user/id']);

sub('auth.sign-in/phone', (state) => state['authentication/state']['auth.sign-in/phone']);

sub(
  'auth.sign-in/active-switch-id',
  (state) => state['authentication/state']['auth.sign-in/active-switch-id']
);

sub(
  'auth.sign-in/sending-otp',
  (state) => state['authentication/state']['auth.sign-in/sending-otp']
);

sub(
  'auth.sign-in/disallow-close',
  (state) => state['authentication/state']['auth.sign-in/disallow-close']
);

evt('auth.sign-in/initiate', (_setState, _params) => null);

evt('auth.sign-in.google/initiate', (_setState, _params) => null);

evt('auth/sign-out', (_setState, _params) => null);

evt('auth.sign-in/send-otp', (_setState, _params) => null);

evt('auth.sign-in/close', (_setState, _params) => null);

evt('auth.sign-in/update-switch', (_setState, _params) => null);

evt('auth.sign-in/update-phone', (_setState, _params) => null);

evt('auth.sign-in/update-email', (_setState, _params) => null);
