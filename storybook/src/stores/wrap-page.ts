import { store as signInStore } from '@story/stores/sign-in';
import { store as navBarStore } from '@story/stores/nav-bar';

export const store = {
  read: {
    ...signInStore.read,
    ...navBarStore.read,
    'auth.sign-in/visible': false,
  },
  dispatch: [...navBarStore.dispatch, ...signInStore.dispatch],
};
