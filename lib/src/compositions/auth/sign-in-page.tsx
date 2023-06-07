import { SocialSignIn } from '@elements/compositions/auth/social-sign-in';
import { wrapPage } from '@elements/compositions/wrap-page';

export const SignInPage = wrapPage(() => {
  // TODO suspense should be a loading spinner
  return <SocialSignIn suspenseLines={3} />;
});
export const routes = {
  'auth/sign-in': <SignInPage />,
};
