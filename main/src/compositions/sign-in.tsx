import { Modal } from "@elements/components/modal";
import { NamedSwitch } from "@elements/components/named-switch";
import { Button } from "@elements/components/button";

const loginOpts = [
  { id: "phone", label: "Phone" },
  { id: "email", label: "Email" },
  { id: "social", label: "Social" },
];
export const SignIn = () => {
  return (
    <Modal title={"Sign in"}>
      <div className={"flex flex-col gap-5"}>
        <NamedSwitch
          options={loginOpts}
          variant={{ size: "sm" }}
          activeSwitch={"phone"}
        />
        <input
          type={"text"}
          className={
            "h-max w-[360px] rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-xl font-medium text-gray-600 shadow-inner"
          }
        />
        <div className={"flex w-full justify-center"}>
          <Button
            value={"Send OTP"}
            variant={{ size: "sm", type: "primary" }}
          />
        </div>
      </div>
    </Modal>
  );
};
