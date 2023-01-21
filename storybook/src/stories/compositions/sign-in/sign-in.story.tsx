import { SignIn } from '@elements/compositions/sign-in/sign-in';

export default {
  title: 'Compositions/SignIn/SignIn',
  component: SignIn,
};

export const Main = () => {
  return (
    <SignIn
      titleText={'Sign in'}
      sendOtpText={'Send OTP'}
      onClose={() => {}}
      onSwitchClick={() => {}}
      onEmailChange={() => {}}
      onPhoneChange={() => {}}
      show={true}
      activeId={'phone'}
      email={''}
      switches={[
        { id: 'phone', label: 'Phone' },
        { id: 'email', label: 'Email' },
      ]}
      onSendOtp={() => {}}
      phone={''}
      sendingOtp={false}
    />
  );
};

export const SendingOTP = () => {
  return (
    <SignIn
      titleText={'Sign in'}
      sendOtpText={'Send OTP'}
      onClose={() => {}}
      onSwitchClick={() => {}}
      onEmailChange={() => {}}
      onPhoneChange={() => {}}
      show={true}
      activeId={'phone'}
      email={''}
      switches={[
        { id: 'phone', label: 'Phone' },
        { id: 'email', label: 'Email' },
      ]}
      onSendOtp={() => {}}
      phone={''}
      sendingOtp={true}
    />
  );
};
