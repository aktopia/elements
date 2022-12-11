import React from "react";
import { XMark } from "@elements/_icons";

export const Modal = ({ title, children }: any) => {
  return (
    <div className="flex w-max flex-col gap-5 rounded-lg border border-gray-100 bg-white px-5 pt-4 pb-5 shadow-md">
      <div className="flex items-center justify-between self-stretch">
        <div className="text-left text-lg font-medium text-gray-900">
          {title}
        </div>
        <XMark
          className={"h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-900"}
        />
      </div>
      <div>{children}</div>
    </div>
  );
};
