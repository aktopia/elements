import React from "react";
import { Button } from "@elements/components/button";

export default {
  title: "Components/Button",
  component: Button
};

export const Primary = {
  render: () => {
    return (
      <div className="flex-column flex gap-10">
        <div className="flex gap-10">
          <Button value={"Button"} variant={{ type: "primary", size: "xs" }} />
          <Button value={"Button"} variant={{ type: "primary", size: "sm" }} />
        </div>
      </div>
    );
  }
};

export const Tertiary = {
  render: () => {
    return (
      <div className="flex-column flex gap-10">
        <div className="flex gap-10">
          <Button value={"Button"} variant={{ type: "tertiary", size: "xs" }} />
          <Button value={"Button"} variant={{ type: "tertiary", size: "sm" }} />
        </div>
      </div>
    );
  }
};
