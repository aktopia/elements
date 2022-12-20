import React from "react";
import { BackIconButton } from "@elements/components/back-icon-button";

export default {
  title: "Components/BackIconButton",
  component: BackIconButton
};

export const Primary = {
  render: () => <BackIconButton variant={{ size: "xs" }} />
};