import React from "react";
import { Alert } from "@elements/components/alert";

export default {
  title: "Components/Alert",
  component: Alert,
};

export const Examples = () => {
  return (
    <div className="flex flex-col gap-10">
      <Alert />
    </div>
  );
};
