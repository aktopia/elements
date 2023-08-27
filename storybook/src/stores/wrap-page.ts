import { store as navBarStore } from '@story/stores/nav-bar';

export const store = {
  sub: {
    ...navBarStore.sub,
    'auth.verify-otp/visible': false,
    'current/locale': 'en',
  },
  evt: [...navBarStore.evt, 'current.locale/set'],
};
