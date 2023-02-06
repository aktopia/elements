import { SignIn as Component } from '@elements/compositions/auth/sign-in';
import { store } from '@story/stores/sign-in';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/Auth/SignIn',
  component: Component,
};
export const SignIn = mockStory({
  store,
  render: () => {
    return <Component />;
  },
});
