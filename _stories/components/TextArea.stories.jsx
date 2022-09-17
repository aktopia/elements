import React from "react";
import { TextArea } from "components/text-area";

export default {
  title: "Components/TextArea",
  component: TextArea,
};

const Template = (args) => <TextArea {...args} />;

export const Primary = Template.bind({});
