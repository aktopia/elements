import React from "react";
import {Feeds} from "components/feeds";

export default {
  title: "Components/Feeds",
  component: Feeds,
};

const Template = (args) => <Feeds {...args} />;

export const Primary = Template.bind({});
