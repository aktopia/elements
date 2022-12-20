import { SignIn } from "@elements/compositions/sign-in/sign-in";
import React from "react";

export default {
  title: "Compositions/SignIn/SignIn",
  component: SignIn,
};

export const Example = () => {
  return (
    <SignIn
      t={{ title: () => "Sign in", sendOtp: () => "Send OTP" }}
      onClose={() => {}}
      onSendEmailOtp={alert}
      onSendPhoneOtp={alert}
      show={true}
    />
  );
};
