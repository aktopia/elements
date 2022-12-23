import { EnterOtp } from '@elements/compositions/sign-in/enter-otp';
import React from 'react';

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
      onOtpInputComplete={() => {}}
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
      onOtpInputComplete={() => {}}
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
      onOtpInputComplete={() => {}}
      show={true}
      resendingOtp={false}
      verifyingOtp={true}
    />
  );
};
