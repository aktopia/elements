import { formatCount } from '@elements/_utils';
import { cva, VariantProps } from 'cva';
import React, { memo } from 'react';

const variant = cva('relative flex items-center justify-center font-medium w-max rounded-md', {
  variants: {
    kind: {
      primary: 'bg-blue-600 text-white shadow-md',
      secondary: 'bg-white text-blue-700 border border-blue-500 shadow',
      tertiary: 'bg-white text-gray-700 border border-gray-300 shadow',
    },
    size: {
      xs: 'text-xs gap-1.5 px-2.5 h-[30px]',
      sm: 'text-sm gap-1.5 px-3 h-[32px] leading-4',
      md: 'text-sm gap-2 px-4 h-[38px]',
    },
    disabled: {
      false: 'cursor-pointer ease-out hover:translate-y-[0.5px] hover:shadow-none transition-all',
      true: 'cursor-default bg-gray-100 text-gray-400 shadow-none',
    },
    clicked: { true: '' },
    hasIcon: { true: '' },
  },
  defaultVariants: {
    kind: 'primary',
    size: 'sm',
  },
  compoundVariants: [
    { size: 'xs', hasIcon: true, class: 'pl-2 pr-2.5 shadow-sm' },
    { size: 'md', hasIcon: true, class: 'pl-3 pr-4' },
    {
      kind: 'tertiary',
      clicked: true,
      class: 'bg-gray-50 translate-y-[0.5px] shadow-none',
    },
  ],
});

const iconVariant = cva('', {
  variants: {
    kind: {
      primary: 'text-white',
      secondary: 'text-blue-600',
      tertiary: 'text-gray-500',
    },
    size: {
      xs: 'h-4 w-4',
      sm: 'h-5 w-5',
      md: 'h-5 w-5',
    },
  },
});

const countVariant = cva('font-medium', {
  variants: {
    kind: {
      primary: 'text-white',
      secondary: 'text-blue-600',
      tertiary: 'text-gray-400',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-sm',
    },
  },
});

type Variant = VariantProps<typeof variant>;

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<'button'>,
    Omit<Variant, 'disabled' | 'clicked'> {
  value: string;
  count?: number;
  clicked?: boolean;
  Icon?: React.ComponentType<any>;
}

export const Button = memo(
  ({
    value,
    count,
    type = 'button',
    Icon,
    size,
    kind,
    disabled,
    clicked,
    ...props
  }: ButtonProps) => {
    return (
      <button
        {...props}
        className={variant({
          size,
          kind,
          disabled: !!disabled,
          hasIcon: !!Icon,
          clicked: !!clicked,
        })}
        type={type === 'submit' ? 'submit' : 'button'}>
        {!!Icon && <Icon className={iconVariant({ size, kind })} />}
        <span>{value}</span>
        {!!count && <span className={countVariant({ size, kind })}>{formatCount(count)}</span>}
      </button>
    );
  }
);
