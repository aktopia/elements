import React from "react";
import { cva, VariantProps } from "cva";
import { ChevronLeftMini } from "_icons";

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
// export const ChevronLeftMini = ({ className }: { className: string }) => {
//   return (
//     <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
//       <path
//         fillRule="evenodd"
//         d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
//         clipRule="evenodd"
//       />
//     </svg>
//   );
// };

export const BackIconButton = ({ variant: { size }, ...props }: Props) => {
  return (
    <button {...props} className={container({ size })}>
      <ChevronLeftMini className={icon({ size })} />
    </button>
  );
};
