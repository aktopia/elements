import { SignIn } from '@elements/compositions/auth/sign-in';
import { suspensify } from '@elements/components/suspensify';

export const Auth = suspensify(() => {
  return (
    <>
      <SignIn />
      {/*<VerifyOtp />*/}
    </>
  );
});
