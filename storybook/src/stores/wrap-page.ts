import { store as navBarStore } from '@story/stores/nav-bar';

export const store = {
  sub: {
    ...navBarStore.read,
    'auth.verify-otp/visible': false,
    'current/locale': 'en',
  },
  evt: [...navBarStore.dispatch, 'current.locale/set'],
};
