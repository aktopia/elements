import { store as mainSearchStore } from '@story/stores/main-search';
import { store as signInStore } from '@story/stores/auth/sign-in';
import { store as verifyOtpStore } from '@story/stores/auth/verify-otp';
import { store as actionCreateModalStore } from '@story/stores/action/create-modal';

export const store = {
  sub: {
    ...mainSearchStore.sub,
    ...signInStore.sub,
    ...verifyOtpStore.sub,
    ...actionCreateModalStore.sub,
    'current.user/id': '2',
    'auth.session/exists': false,
    'main-search/visible': false,
    'action.create.modal/visible': false,
    'auth.verify-otp/visible': false,
    'auth.sign-in/visible': false,
  },
  evt: [
    'main-search/open',
    ...actionCreateModalStore.evt,
    ...mainSearchStore.evt,
    ...signInStore.evt,
    ...verifyOtpStore.evt,
  ],
};
