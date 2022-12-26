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
      resendOtpState={'can-resend'}
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
      resendOtpState={'resending'}
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
      resendOtpState={'can-resend'}
      verifyingOtp={true}
    />
  );
};

export const WaitingForOTP = () => {
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
      resendOtpState={'waiting'}
      waitToSendOtpText={'You can resend OTP in 12s'}
      verifyingOtp={false}
    />
  );
};
