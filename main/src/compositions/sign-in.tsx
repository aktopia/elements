import { Modal } from "@elements/components/modal";
import { NamedSwitch } from "@elements/components/named-switch";
import { Button } from "@elements/components/button";
import { useCallback, useState } from "react";

const loginOpts = [
  { id: "phone", label: "Phone" },
  { id: "email", label: "Email" },
  // { id: "social", label: "Social" },
];

export const SignIn = ({ onSendPhoneOTP, onEmailSendOTP }: any) => {
  const [activeSwitch, setActiveSwitch] = useState("phone");
  const onSendOTP = useCallback(() => {
    activeSwitch == "phone" ? onSendPhoneOTP() : onEmailSendOTP;
  }, [activeSwitch]);

  return (
    <Modal title={"Sign in"}>
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
            value={"Send OTP"}
            variant={{ size: "sm", type: "primary" }}
          />
        </div>
      </div>
    </Modal>
  );
};
