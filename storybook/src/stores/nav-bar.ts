import { store as mainSearchStore } from '@story/stores/main-search';

export const store = {
  read: {
    ...mainSearchStore.read,
    'current.user/id': '2',
    'auth.session/exists': false,
    'auth.sign-in/visible': false,
    'main-search/visible': false,
  },
  dispatch: ['auth.sign-in/initiate', 'main-search/open', ...mainSearchStore.dispatch],
};
