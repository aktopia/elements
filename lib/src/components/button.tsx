import React from 'react';
import { cva, VariantProps } from 'cva';

const variant = cva('flex font-medium justify-center w-max items-center rounded-md', {
  variants: {
    type: {
      primary: 'bg-blue-600 text-white',
      tertiary: 'bg-white text-gray-700 border border-gray-300',
    },
    size: {
      xs: 'text-xs gap-2 px-3 py-2 shadow-sm',
      sm: 'text-sm gap-3 px-4 py-2.5 shadow-md',
    },
    disabled: {
      false: 'cursor-pointer ease-out hover:translate-y-[0.5px] hover:shadow-none transition-all',
      true: 'cursor-default bg-gray-100 text-gray-400 shadow-none',
    },
  },
  defaultVariants: {
    type: 'primary',
    size: 'sm',
  },
});

type Variant = VariantProps<typeof variant>;

interface IButton extends React.ComponentPropsWithoutRef<'button'> {
  value: string;
  variant: Variant;
}

export const Button = ({ value, variant: { size, type }, disabled, ...props }: IButton) => {
  return (
    <button {...props} className={variant({ size, type, disabled: !!disabled })}>
      {value}
    </button>
  );
};
