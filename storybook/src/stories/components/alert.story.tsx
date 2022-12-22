import React from "react";
import { Alert } from "@elements/components/alert";

export default {
  title: "Components/Alert",
  component: Alert,
};

export const Success = {
  render: () => <Alert messageText={"Success"} variant={{ type: "success" }} />,
};

export const Info = {
  render: () => (
    <Alert messageText={"Information"} variant={{ type: "info" }} />
  ),
};

export const Warning = {
  render: () => <Alert messageText={"Warning"} variant={{ type: "warning" }} />,
};

export const Error = {
  render: () => <Alert messageText={"Error"} variant={{ type: "error" }} />,
};

// https://github.com/storybookjs/storybook/issues/12153
