import { ChevronLeftMini } from '@elements/icons';
import { cva } from '@elements/utils/style';
import React from 'react';

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

interface BackButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  size: 'xs';
}

export const BackIconButton = ({ size, ...props }: BackButtonProps) => {
  return (
    <button {...props} className={container({ size })} type={'button'}>
      <ChevronLeftMini className={icon({ size })} />
    </button>
  );
};
