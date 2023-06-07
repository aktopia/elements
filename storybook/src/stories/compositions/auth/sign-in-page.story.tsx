import { SignInPage as Component } from '@elements/compositions/auth/sign-in-page';
import { mockStory } from '@story/utils/mock-story';

const store = {
  read: {
    'auth.sign-in/visible': true,
    'auth.sign-in/disallow-close': true,
  },
  dispatch: ['auth.sign-in.google/initiate'],
};

export default {
  title: 'Compositions/Auth/SignInPage',
  component: Component,
};
export const SignInPage = mockStory({
  store,
  render: () => {
    return <Component />;
  },
});
