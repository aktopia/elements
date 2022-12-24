import { EnterOtp } from '@elements/compositions/sign-in/enter-otp';

export default {
  title: 'Compositions/SignIn/EnterOtp',
  component: EnterOtp,
};

export const Main = () => {
  return (
    <EnterOtp
      titleText="Enter OTP"
      resendOtpText={'Resend OTP'}
      onClose={() => {}}
      onBack={() => {}}
      onResendOtp={() => {}}
      onOtpChange={() => {}}
      num={6}
      otp={''}
      show={true}
      resendingOtp={false}
      verifyingOtp={false}
    />
  );
};

export const ResendingOTP = () => {
  return (
    <EnterOtp
      titleText="Enter OTP"
      resendOtpText={'Resend OTP'}
      onClose={() => {}}
      onBack={() => {}}
      onResendOtp={() => {}}
      onOtpChange={() => {}}
      num={6}
      otp={''}
      show={true}
      resendingOtp={true}
      verifyingOtp={false}
    />
  );
};

export const VerifyingOTP = () => {
  return (
    <EnterOtp
      titleText="Enter OTP"
      resendOtpText={'Resend OTP'}
      onClose={() => {}}
      onBack={() => {}}
      onResendOtp={() => {}}
      onOtpChange={() => {}}
      num={6}
      otp={''}
      show={true}
      resendingOtp={false}
      verifyingOtp={true}
    />
  );
};
