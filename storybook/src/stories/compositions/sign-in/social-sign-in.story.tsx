import { SocialSignIn } from '@elements/compositions/sign-in/social-sign-in';

export default {
  title: 'Compositions/SignIn/SocialSignIn',
  component: SocialSignIn,
};

export const Main = () => {
  return (
    <SocialSignIn
      titleText={'Sign in'}
      onClose={() => {}}
      show={true}
      onGoogleClick={console.log}
    />
  );
};
