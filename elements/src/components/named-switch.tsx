import React from "react";
import { cva, VariantProps } from "cva";

const containerVariant = cva(
  "flex w-max items-center justify-center gap-1 rounded-lg bg-gray-50 border border-gray-100 overflow-scroll",
  {
    variants: {
      size: {
        xs: "p-1 text-xs gap-1",
        sm: "p-1 text-sm gap-1",
      },
    },
  }
);

const switchVariant = cva(
  "flex cursor-pointer items-center justify-center font-medium",
  {
    variants: {
      size: {
        xs: "px-2 py-1",
        sm: "px-3 py-1.5",
      },
      status: {
        active: "text-gray-600 shadow bg-white rounded-md",
        inactive:
          "text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-md",
      },
    },
  }
);

export type ContainerVariant = VariantProps<typeof containerVariant>;

interface Option {
  id: string;
  label: string;
}

interface Props {
  activeSwitch: string;
  options: Option[];
  onSwitchClick: Function;
  variant: ContainerVariant;
}

export const NamedSwitch = ({
  activeSwitch,
  options,
  onSwitchClick,
  variant: { size },
}: Props) => {
  return (
    <div className={containerVariant({ size })}>
      {options.map(({ id, label }: any) => {
        const status = id == activeSwitch ? "active" : "inactive";

        return (
          <div
            onClick={() => onSwitchClick(id)}
            className={switchVariant({ status, size })}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

/*
TODO
Transitions
useCallback instead of anon function
Other size variants when necessary
Types
 */
