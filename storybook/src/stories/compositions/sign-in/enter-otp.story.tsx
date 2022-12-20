import { EnterOTP } from "@elements/compositions/sign-in/enter-otp";
import React from "react";

export default {
  title: "Compositions/SignIn/EnterOTP",
  component: EnterOTP,
};

export const Example = () => {
  return (
    <EnterOTP
      t={{ title: () => "Enter OTP", resendOTP: () => "Resend OTP" }}
      onClose={() => {}}
      onBack={() => {}}
      onResendOTP={() => {}}
      onOTPInputComplete={() => {}}
    />
  );
};
