import React from 'react';
import { cva, VariantProps } from 'cva';
import { ChevronLeftMini } from '@elements/_icons';

const container = cva(
  'flex justify-center w-max cursor-pointer items-center rounded-full bg-white border border-gray-300 hover:translate-y-[0.5px] hover:shadow-none transition-all ease-out',
  {
    variants: {
      size: {
        xs: 'p-1 shadow-sm',
      },
    },
  }
);

const icon = cva('text-gray-700', {
  variants: {
    size: {
      xs: 'h-4 w-4',
    },
  },
});

type Variant = VariantProps<typeof container>;

interface IBackButton extends React.ComponentPropsWithoutRef<'button'> {
  variant: Variant;
}

export const BackIconButton = ({ variant: { size }, ...props }: IBackButton) => {
  return (
    <button {...props} className={container({ size })}>
      <ChevronLeftMini className={icon({ size })} />
    </button>
  );
};
