import React from "react";
import { OTPInput } from "@elements/components/otp-input";

export default {
  title: "Components/OTPInput",
  component: OTPInput
};

export const Examples = () => {
  return (
    <div className="flex flex-col gap-10">
      <OTPInput num={6} onInputComplete={console.log} />
      <OTPInput num={4} onInputComplete={console.log} />
    </div>
  );
};
