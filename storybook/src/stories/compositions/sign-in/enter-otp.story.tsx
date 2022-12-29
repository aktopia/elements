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
      onOtpFocus={() => {}}
    />
  );
};

export const WrongOTP = () => {
  return (
    <EnterOtp
      titleText="Enter OTP"
      resendOtpText={'Resend OTP'}
      onClose={() => {}}
      onBack={() => {}}
      onResendOtp={() => {}}
      onOtpChange={() => {}}
      num={6}
      otp={'575246'}
      show={true}
      resendOtpState={'can-resend'}
      verifyingOtp={false}
      otpErrorText={'Incorrect OTP, please try again.'}
      onOtpFocus={() => {}}
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
      onOtpFocus={() => {}}
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
      onOtpFocus={() => {}}
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
      onOtpFocus={() => {}}
    />
  );
};
