import React from 'react';
import { cva, VariantProps } from 'cva';

const variant = cva(
  'flex font-medium justify-center w-max cursor-pointer items-center rounded-md ease-out hover:translate-y-[0.5px] hover:shadow-none transition-all',
  {
    variants: {
      type: {
        primary: 'bg-blue-600 text-white',
        tertiary: 'bg-white text-gray-700 border border-gray-300',
      },
      size: {
        xs: 'text-xs gap-2 px-3 py-2 shadow-sm',
        sm: 'text-sm gap-3 px-4 py-2.5 shadow',
      },
    },
    defaultVariants: {
      type: 'primary',
      size: 'sm',
    },
  }
);

type Variant = VariantProps<typeof variant>;

interface IButton extends React.ComponentPropsWithoutRef<'button'> {
  value: string;
  variant: Variant;
}

export const Button = ({ value, variant: { size, type }, ...props }: IButton) => {
  return (
    <button {...props} className={variant({ size, type })}>
      {value}
    </button>
  );
};
