import { store as navBarStore } from '@story/stores/nav-bar';

export const store = {
  read: {
    ...navBarStore.read,
    'auth.verify-otp/visible': false,
    'current/locale': 'en',
  },
  dispatch: [...navBarStore.dispatch, 'current.locale/set'],
};
