import { EnterOtp } from '@elements/compositions/sign-in/enter-otp';

export default {
  title: 'Compositions/SignIn/EnterOtp',
  component: EnterOtp,
};

export const Main = () => {
  return (
    <EnterOtp
      num={6}
      otp={''}
      resendOtpState={'can-resend'}
      resendOtpText={'Resend OTP'}
      show={true}
      titleText={'Enter OTP'}
      verifyingOtp={false}
      onBack={() => {}}
      onClose={() => {}}
      onOtpChange={() => {}}
      onOtpFocus={() => {}}
      onResendOtp={() => {}}
    />
  );
};

export const WrongOTP = () => {
  return (
    <EnterOtp
      num={6}
      otp={'575246'}
      otpErrorText={'Incorrect OTP, please try again.'}
      resendOtpState={'can-resend'}
      resendOtpText={'Resend OTP'}
      show={true}
      titleText={'Enter OTP'}
      verifyingOtp={false}
      onBack={() => {}}
      onClose={() => {}}
      onOtpChange={() => {}}
      onOtpFocus={() => {}}
      onResendOtp={() => {}}
    />
  );
};

export const ResendingOTP = () => {
  return (
    <EnterOtp
      num={6}
      otp={''}
      resendOtpState={'resending'}
      resendOtpText={'Resend OTP'}
      show={true}
      titleText={'Enter OTP'}
      verifyingOtp={false}
      onBack={() => {}}
      onClose={() => {}}
      onOtpChange={() => {}}
      onOtpFocus={() => {}}
      onResendOtp={() => {}}
    />
  );
};

export const VerifyingOTP = () => {
  return (
    <EnterOtp
      num={6}
      otp={''}
      resendOtpState={'can-resend'}
      resendOtpText={'Resend OTP'}
      show={true}
      titleText={'Enter OTP'}
      verifyingOtp={true}
      onBack={() => {}}
      onClose={() => {}}
      onOtpChange={() => {}}
      onOtpFocus={() => {}}
      onResendOtp={() => {}}
    />
  );
};

export const WaitingForOTP = () => {
  return (
    <EnterOtp
      num={6}
      otp={''}
      resendOtpState={'waiting'}
      resendOtpText={'Resend OTP'}
      show={true}
      titleText={'Enter OTP'}
      verifyingOtp={false}
      waitToSendOtpText={'You can resend OTP in 12s'}
      onBack={() => {}}
      onClose={() => {}}
      onOtpChange={() => {}}
      onOtpFocus={() => {}}
      onResendOtp={() => {}}
    />
  );
};
