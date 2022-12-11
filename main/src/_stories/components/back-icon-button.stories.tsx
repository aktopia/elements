import React from "react";
import { BackIconButton } from "components/back-icon-button";

const Examples = () => {
  return (
    <div className="flex flex-col gap-10">
      <BackIconButton variant={{ size: "xs" }} />
    </div>
  );
};

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Something',
  component: BackIconButton,
};
