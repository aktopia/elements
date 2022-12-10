import React from "react";
import { NamedSwitch } from "../../components/named-switch";

export const Display = () => {
  return (
    <div className="flex-column flex gap-10">
      <div className="flex gap-10">
        <NamedSwitch
          variant={{ size: "xs" }}
          activeSwitch={"phone"}
          options={[
            { id: "phone", label: "Phone" },
            { id: "email", label: "Email" },
            { id: "social", label: "Social" },
          ]}
        />
      </div>
      <div className="flex gap-10">
        <NamedSwitch
          variant={{ size: "xs" }}
          activeSwitch={{ id: "email", label: "Email" }}
          options={[
            { id: "phone", label: "Phone" },
            { id: "email", label: "Email" },
            { id: "social", label: "Social" },
          ]}
        />
      </div>
      <div className="flex gap-10">
        <NamedSwitch
          variant={{ size: "xs" }}
          activeSwitch={"social"}
          options={[
            { id: "phone", label: "Phone" },
            { id: "email", label: "Email" },
            { id: "social", label: "Social" },
          ]}
        />
      </div>
    </div>
  );
};
