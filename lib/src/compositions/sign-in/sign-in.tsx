import { Modal } from "@elements/components/modal";
import { NamedSwitch } from "@elements/components/named-switch";
import { Button } from "@elements/components/button";
import React, { useCallback, useState } from "react";

const loginOpts = [
  { id: "phone", label: "Phone" },
  { id: "email", label: "Email" },
];

interface ISignIn {
  onSendPhoneOTP: Function;
  onSendEmailOTP: Function;
  onClose: Function;
  show: boolean;
  t: { title: Function; sendOTP: Function };
}

export const SignIn = ({
  onSendPhoneOTP,
  onSendEmailOTP,
  onClose,
  show,
  t,
}: ISignIn) => {
  const [activeSwitch, setActiveSwitch] = useState("phone");
  const [phone, setPhone] = useState<string>();
  const [email, setEmail] = useState<string>();
  const onSendOTP = useCallback(() => {
    activeSwitch == "phone" ? onSendPhoneOTP(phone) : onSendEmailOTP(email);
  }, [activeSwitch, phone, email]);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      activeSwitch == "phone"
        ? setPhone(e.target.value)
        : setEmail(e.target.value);
    },
    [activeSwitch]
  );

  const inputValue = activeSwitch == "phone" ? phone : email;

  return (
    <Modal title={t.title()} onClose={onClose} show={show}>
      <div className={"flex flex-col gap-5"}>
        <NamedSwitch
          options={loginOpts}
          variant={{ size: "sm" }}
          activeSwitch={activeSwitch}
          onSwitchClick={setActiveSwitch}
        />
        <input
          value={inputValue}
          type={"text"}
          onChange={onInputChange}
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

/*
Mobile responsive
Send OTP disabled
Phone validations
Email validation
Error messages
Input component
 */
