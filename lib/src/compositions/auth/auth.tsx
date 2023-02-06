import { EnterOtp } from '@elements/compositions/auth/enter-otp';
import { SignIn } from '@elements/compositions/auth/sign-in';
import { useDispatch, useValue } from '@elements/store';

export const Auth = () => {
  const authenticated = useValue<boolean>('auth.session/exists');
  const name = useValue<boolean>('current.user/name');
  const onSignInClick = useDispatch('auth.sign-in/initiate');
  const buttonText = authenticated ? name : 'Sign In';

  return (
    <div>
      <div onClick={onSignInClick}>{buttonText}</div>
      <SignIn />
      <EnterOtp />
    </div>
  );
};
