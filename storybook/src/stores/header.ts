export const store = {
  read: {
    'auth.session/exists': false,
    'current.user/name': '',
  },
  dispatch: ['auth.sign-in/initiate'],
};
