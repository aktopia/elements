import { SignIn } from "@elements/compositions/sign-in";
import React from "react";

export default {
  title: "Compositions/SignIn",
  component: SignIn,
};

export const Example = () => {
  return (
    <SignIn
      t={{ title: () => "Sign in", sendOTP: () => "Send OTP" }}
      onClose={() => {}}
      onEmailSendOTP={() => {}}
      onSendPhoneOTP={() => {}}
    />
  );
};
