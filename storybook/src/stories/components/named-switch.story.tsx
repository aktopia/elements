import React from "react";
import { NamedSwitch } from "@elements/components/named-switch";

export default {
  title: "Components/NamedSwitch",
  component: NamedSwitch
};

export const Examples = () => {
  return (
    <div className="flex-column flex gap-10">
      <div className="flex gap-10">
        <NamedSwitch
          onSwitchClick={()=> {}}
          variant={{ size: "xs" }}
          activeSwitch={"phone"}
          options={[
            { id: "phone", label: "Phone" },
            { id: "email", label: "Email" },
            { id: "social", label: "Social" }
          ]}
        />
      </div>
      <div className="flex gap-10">
        <NamedSwitch
          onSwitchClick={()=> {}}
          variant={{ size: "xs" }}
          activeSwitch={"email"}
          options={[
            { id: "phone", label: "Phone" },
            { id: "email", label: "Email" },
            { id: "social", label: "Social" }
          ]}
        />
      </div>
      <div className="flex gap-10">
        <NamedSwitch
          onSwitchClick={()=> {}}
          variant={{ size: "xs" }}
          activeSwitch={"social"}
          options={[
            { id: "phone", label: "Phone" },
            { id: "email", label: "Email" },
            { id: "social", label: "Social" }
          ]}
        />
      </div>
    </div>
  );
};
