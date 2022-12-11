import React from "react";
import { Modal } from "@aktopia/elements/src/components/modal";

export const Examples = () => {
  return (
    <div className="flex-column flex gap-10">
      <Modal
        title={"Sign in"}
        content={<div className={"w-56"}>Whateve</div>}
      />
    </div>
  );
};
