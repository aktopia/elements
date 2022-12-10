import React from "react";
import { OTPInput } from "components/otp-input";

export const Examples = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-10">
        <OTPInput num={6} onInputComplete={console.log} />
      </div>
    </div>
  );
};
