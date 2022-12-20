import { EnterOtp } from "@elements/compositions/sign-in/enter-otp";
import React from "react";

export default {
  title: "Compositions/SignIn/EnterOtp",
  component: EnterOtp,
};

export const Example = () => {
  return (
    <EnterOtp
      t={{ title: () => "Enter OTP", resendOtp: () => "Resend OTP" }}
      onClose={() => {}}
      onBack={() => {}}
      onResendOtp={() => {}}
      onOtpInputComplete={() => {}}
      show={true}
    />
  );
};
