import React from "react";
import Button from "components/button";
import { Size } from "_util/types/size";

export default {
  title: "Components/Button",
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  text: "Button",
  size: Size.md,
};
