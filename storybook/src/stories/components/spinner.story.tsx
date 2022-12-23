import React from "react";
import { Spinner } from "@elements/components/spinner";

export default {
  title: "Components/Spinner",
  component: Spinner,
};

export const Examples = () => {
  return (
    <div className="flex flex-col gap-10">
      <Spinner show={true} variant={{ size: "xs", type: "primary" }} />
    </div>
  );
};
