import React from "react";

const XMark = ({ className }: any) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

export const Modal = ({ title, content }: any) => {
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
      <div>{content}</div>
    </div>
  );
};
