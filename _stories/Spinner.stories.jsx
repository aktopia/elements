import React from "react";
// import Spinner from "/src/components/spinner";
import { Spinner } from "/dist/esm";

export default {
  title: "Components/Spinner",
  component: Spinner,
};

const Template = (args) => <Spinner {...args} />;

export const Primary = Template.bind({});
