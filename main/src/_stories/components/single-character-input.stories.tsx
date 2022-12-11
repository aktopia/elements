import React from "react";
import { SingleCharacterInput } from "components/single-character-input";

export const Examples = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-10">
        <SingleCharacterInput value={"9"} />
        <SingleCharacterInput value={"A"} />
      </div>
      <div className="flex gap-4">
        <SingleCharacterInput value={"2"} />
        <SingleCharacterInput value={"9"} />
        <SingleCharacterInput value={"4"} />
        <SingleCharacterInput value={"5"} />
        <SingleCharacterInput value={"8"} />
        <SingleCharacterInput value={"1"} />
      </div>
    </div>
  );
};
