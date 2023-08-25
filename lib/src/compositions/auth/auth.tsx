import { suspensify } from '@elements/components/suspensify';
import { VerifyOtp } from '@elements/compositions/auth/verify-otp';
import { SignIn } from '@elements/compositions/auth/sign-in';

export const Auth = suspensify(() => {
  return (
    <>
      <SignIn />
      <VerifyOtp />
    </>
  );
});
