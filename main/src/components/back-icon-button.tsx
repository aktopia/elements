import React from "react";
import { cva, VariantProps } from "cva";
import { ChevronLeftMini } from "@elements/_icons";

const container = cva(
  "flex justify-center w-max cursor-pointer items-center rounded-full bg-white border border-gray-300",
  {
    variants: {
      size: {
        xs: "p-1 shadow-sm",
      },
    },
  }
);

const icon = cva("text-gray-700", {
  variants: {
    size: {
      xs: "h-4 w-4",
    },
  },
});

export type Variant = VariantProps<typeof container>;

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  variant: Variant;
}

export const BackIconButton = ({ variant: { size }, ...props }: Props) => {
  return (
    <button {...props} className={container({ size })}>
      <ChevronLeftMini className={icon({ size })} />
    </button>
  );
};
