import React from "react";
import { Alert } from "@elements/components/alert";

export default {
  title: "Components/Alert",
  component: Alert,
};

export const Examples = {
  render: () => (
    <div className="flex flex-col gap-10">
      <Alert messageText={"Success"} variant={{ type: "success" }} />
    </div>
  ),
};

// https://github.com/storybookjs/storybook/issues/12153
