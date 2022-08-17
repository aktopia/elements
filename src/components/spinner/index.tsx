import React from "react";
import { Size } from "_util/types/size";

type SizeDimensionMapping = {
  [key in Size]?: number;
};

const resolveDimension: SizeDimensionMapping = {
  [Size.sm]: 5,
  [Size.md]: 10,
  [Size.lg]: 16,
  [Size.xl]: 20,
};

interface Props {
  size: Size;
  className?: string;
}

function Spinner({ size = Size.md, className }: Props) {
  const dimension = resolveDimension[size];
  return (
    <div className={`${className} overflow-hidden`}>
      <svg
        className={`animate-spin text-gray-900 h-${dimension} w-${dimension} `}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="#3b82f6" // TODO Use global variable
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
}

export default Spinner;
