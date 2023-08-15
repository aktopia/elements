import { SignIn } from '@elements/compositions/auth/sign-in';
import { suspensify } from '@elements/components/suspensify';
import { VerifyOtp } from '@elements/compositions/auth/verify-otp';

export const Auth = suspensify(() => {
  return (
    <>
      <SignIn />
      <VerifyOtp />
    </>
  );
});
