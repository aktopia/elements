import { SignIn } from '@elements/compositions/sign-in/sign-in';

export default {
  title: 'Compositions/SignIn/SignIn',
  component: SignIn,
};

export const Main = () => {
  return (
    <SignIn
      activeSwitchId={'phone'}
      email={''}
      phone={''}
      sendOtpText={'Send OTP'}
      sendingOtp={false}
      show={true}
      switches={[
        { id: 'phone', label: 'Phone' },
        { id: 'email', label: 'Email' },
      ]}
      titleText={'Sign in'}
      onClose={() => {}}
      onEmailChange={() => {}}
      onPhoneChange={() => {}}
      onSendOtp={() => {}}
      onSwitchClick={() => {}}
    />
  );
};

export const SendingOTP = () => {
  return (
    <SignIn
      activeSwitchId={'phone'}
      email={''}
      phone={''}
      sendOtpText={'Send OTP'}
      sendingOtp={true}
      show={true}
      switches={[
        { id: 'phone', label: 'Phone' },
        { id: 'email', label: 'Email' },
      ]}
      titleText={'Sign in'}
      onClose={() => {}}
      onEmailChange={() => {}}
      onPhoneChange={() => {}}
      onSendOtp={() => {}}
      onSwitchClick={() => {}}
    />
  );
};
