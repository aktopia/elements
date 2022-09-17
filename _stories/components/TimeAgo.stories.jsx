import React from "react";
import { TimeAgo } from "components/time-ago";

export default {
  title: "Components/TimeAgo",
  component: TimeAgo,
};

const Template = (args) => <TimeAgo {...args} />;

export const Primary = Template.bind({});
