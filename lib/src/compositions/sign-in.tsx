import { Modal } from "@elements/components/modal";
import { NamedSwitch } from "@elements/components/named-switch";
import { Button } from "@elements/components/button";
import React, { useCallback, useState } from "react";

const loginOpts = [
  { id: "phone", label: "Phone" },
  { id: "email", label: "Email" }
];

interface ISignIn {
  onSendPhoneOTP: Function,
  onEmailSendOTP: Function,
  onClose: Function,
  t: { title: Function, sendOTP: Function }
}

export const SignIn = ({ onSendPhoneOTP, onEmailSendOTP, onClose, t }: ISignIn) => {
  const [activeSwitch, setActiveSwitch] = useState("phone");
  const onSendOTP = useCallback(() => {
    activeSwitch == "phone" ? onSendPhoneOTP() : onEmailSendOTP;
  }, [activeSwitch]);

  return (
    <Modal title={t.title()} onClose={onClose}>
      <div className={"flex flex-col gap-5"}>
        <NamedSwitch
          options={loginOpts}
          variant={{ size: "sm" }}
          activeSwitch={activeSwitch}
          onSwitchClick={setActiveSwitch}
        />
        <input
          type={"text"}
          className={
            "h-max w-[360px] rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-xl font-medium text-gray-600 shadow-inner"
          }
        />
        <div className={"flex w-full justify-center"}>
          <Button
            onClick={onSendOTP}
            value={t.sendOTP()}
            variant={{ size: "sm", type: "primary" }}
          />
        </div>
      </div>
    </Modal>
  );
};
