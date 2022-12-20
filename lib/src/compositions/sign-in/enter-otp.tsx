import { Modal } from "@elements/components/modal";
import { Button } from "@elements/components/button";
import React, { MouseEventHandler } from "react";
import { BackIconButton, OtpInput } from "@elements/components";

interface IEnterOtp {
  onOtpInputComplete: (charArray: string[]) => void;
  onBack: MouseEventHandler<HTMLButtonElement>;
  onClose: MouseEventHandler<HTMLButtonElement>;
  onResendOtp: MouseEventHandler<HTMLButtonElement>;
  show: boolean;
  t: { title: Function; resendOtp: Function };
}

export const EnterOtp = ({
  onOtpInputComplete,
  onClose,
  onBack,
  onResendOtp,
  show,
  t,
}: IEnterOtp) => {
  return (
    <Modal title={t.title()} onClose={onClose} show={show}>
      <div className={"flex flex-col gap-5"}>
        <OtpInput num={6} onInputComplete={onOtpInputComplete} />
        <div className={"grid grid-cols-3 items-center"}>
          <div>
            <BackIconButton variant={{ size: "xs" }} onClick={onBack} />
          </div>
          <Button
            onClick={onResendOtp}
            value={t.resendOtp()}
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
- Shaking error on Wrong Otp
 */
