import { store as mainSearchStore } from '@story/stores/main-search';
import { store as signInStore } from '@story/stores/auth/sign-in';
import { store as verifyOtpStore } from '@story/stores/auth/verify-otp';
import { store as actionCreateModalStore } from '@story/stores/action/create-modal';

export const store = {
  read: {
    ...mainSearchStore.read,
    ...signInStore.read,
    ...verifyOtpStore.read,
    ...actionCreateModalStore.read,
    'current.user/id': '2',
    'auth.session/exists': false,
    'auth.sign-in/visible': false,
    'main-search/visible': false,
    'action.create.modal/visible': false,
  },
  dispatch: [
    'main-search/open',
    ...actionCreateModalStore.dispatch,
    ...mainSearchStore.dispatch,
    ...signInStore.dispatch,
    ...verifyOtpStore.dispatch,
  ],
};
