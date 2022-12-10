import React from "react";
import { cva, VariantProps } from "cva";

const containerVariant = cva(
  "flex items-center justify-center gap-1 rounded-lg bg-gray-50",
  {
    variants: {
      size: {
        xs: "p-1 text-xs gap-1",
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
      },
      status: {
        active: "text-gray-600 shadow bg-white rounded-md",
        inactive: "text-gray-500",
      },
    },
  }
);

export type ContainerVariant = VariantProps<typeof containerVariant>;

interface Props {
  value: string;
  variant: ContainerVariant;
}

export const NamedSwitch = ({
  activeSwitch,
  options,
  variant: { size },
}: any) => {
  return (
    <div className={containerVariant({ size })}>
      {options.map(({ id, label }: any) => {
        const activeSwitchId =
          typeof activeSwitch == "object" ? activeSwitch.id : activeSwitch;

        const status = id == activeSwitchId ? "active" : "inactive";

        return <div className={switchVariant({ status, size })}>{label}</div>;
      })}
    </div>
  );
};
