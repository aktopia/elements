import { Modal } from "@elements/components/modal";
import { Button } from "@elements/components/button";
import React, { MouseEventHandler } from "react";
import { BackIconButton, OTPInput } from "@elements/components";

interface IEnterOTP {
  onOTPInputComplete: (charArray: string[]) => void;
  onBack: MouseEventHandler<HTMLButtonElement>;
  onClose: MouseEventHandler<HTMLButtonElement>;
  onResendOTP: MouseEventHandler<HTMLButtonElement>;
  show: boolean;
  t: { title: Function; resendOTP: Function };
}

export const EnterOTP = ({
  onOTPInputComplete,
  onClose,
  onBack,
  onResendOTP,
  show,
  t,
}: IEnterOTP) => {
  return (
    <Modal title={t.title()} onClose={onClose} show={show}>
      <div className={"flex flex-col gap-5"}>
        <OTPInput num={6} onInputComplete={onOTPInputComplete} />
        <div className={"grid grid-cols-3 items-center"}>
          <div>
            <BackIconButton variant={{ size: "xs" }} onClick={onBack} />
          </div>
          <Button
            onClick={onResendOTP}
            value={t.resendOTP()}
            variant={{ size: "xs", type: "tertiary" }}
          />
        </div>
      </div>
    </Modal>
  );
};

/*
TODO
- Loading
- Shaking error on Wrong OTP
 */
