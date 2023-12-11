import { store as navBarStore } from '@story/stores/nav-bar';
import { store as confirmationModalStore } from '@story/stores/confirmation-modal';

export const store = {
  sub: {
    ...confirmationModalStore.sub,
    ...navBarStore.sub,
    'auth.verify-otp/visible': false,
    'current/locale': 'en',
  },
  evt: [...confirmationModalStore.evt, ...navBarStore.evt, 'current.locale/set'],
};
