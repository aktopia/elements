import { formatCount } from '@elements/utils';
import { cva } from 'cva';
import type { ComponentType, ForwardedRef, HTMLProps } from 'react';
import { type ComponentProps, forwardRef, memo, type MouseEvent, useCallback } from 'react';
import { Link } from '@elements/components/link';

const containerVariant = cva('relative flex items-center justify-center rounded-md default-focus', {
  variants: {
    kind: {
      primary: 'bg-blue-600 text-white shadow-md',
      secondary: 'bg-white text-blue-700 border border-blue-500 shadow',
      tertiary: 'bg-white text-gray-700 border border-gray-300 shadow',
      success: 'bg-green-600 text-white shadow-md',
      danger: 'bg-red-600 text-white shadow-md',
      warning: 'text-amber-700 border border-amber-500 bg-amber-50 shadow',
      'danger-outline': 'bg-white text-red-700 border border-red-500 shadow-md',
    },
    size: {
      xxs: 'text-xs gap-1.5 px-1.5 h-[28px] font-normal shadow-sm',
      xs: 'text-xs gap-1.5 px-2.5 h-[32px] font-medium',
      sm: 'text-sm gap-2.5 px-3 h-[36px] font-medium',
      md: 'text-base gap-3 px-4 h-[40px] font-medium',
    },
    disabled: {
      false: 'cursor-pointer ease-out hover:translate-y-[0.5px] hover:shadow-none transition-all',
      true: 'cursor-default bg-gray-100 text-gray-400 shadow-none',
    },
    clicked: { true: '' },
    hasIcon: { true: '' },
    hasSecondaryIcon: { true: '' },
  },
  defaultVariants: {
    kind: 'primary',
    size: 'sm',
  },
  compoundVariants: [
    { size: 'xs', hasIcon: true, class: 'pl-2 pr-2.5 shadow-sm' },
    { size: 'sm', hasIcon: true, class: 'pl-2.5 pr-3 shadow-sm' },
    { size: 'md', hasIcon: true, class: 'pl-3 pr-4' },
    { size: 'xs', hasSecondaryIcon: true, class: 'pr-2 pl-2.5 shadow-sm' },
    { size: 'sm', hasSecondaryIcon: true, class: 'pr-2.5 pl-3 shadow-sm' },
    { size: 'md', hasSecondaryIcon: true, class: 'pr-3 pl-4' },
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
      warning: 'text-amber-700',
      success: 'text-white',
      danger: 'text-white',
      'danger-outline': 'text-red-600',
    },
    size: {
      xxs: 'h-4 w-4',
      xs: 'h-4 w-4',
      sm: 'h-5 w-5',
      md: 'h-5 w-5',
    },
  },
});

const secondaryIconVariant = cva('', {
  variants: {
    kind: {
      primary: 'text-white',
      secondary: 'text-blue-600',
      tertiary: 'text-gray-500',
      warning: 'text-amber-700',
      success: 'text-white',
      danger: 'text-white',
      'danger-outline': 'text-red-600',
    },
    size: {
      xxs: 'h-4 w-4',
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
      warning: 'text-amber-600',
      success: 'text-white',
      danger: 'text-white',
      'danger-outline': 'text-white',
    },
    size: {
      xxs: 'text-xs',
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-sm',
    },
  },
});

type ButtonSize = 'xxs' | 'xs' | 'sm' | 'md';

export type ButtonKind =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'danger-outline';

export interface ButtonProps extends Omit<HTMLProps<HTMLButtonElement>, 'size'> {
  size: ButtonSize;
  value: string;
  count?: number;
  clicked?: boolean;
  Icon?: ComponentType<any>;
  SecondaryIcon?: ComponentType<any>;
  iconClassName?: string;
  secondaryIconClassName?: string;
  containerClassName?: string;
  type?: 'button' | 'submit';
  kind: ButtonKind;
  disabled?: boolean;
  onClick?: any;
  'data-event-id'?: string;
}

const Button_ = forwardRef(
  (
    {
      value,
      count,
      type = 'button',
      Icon,
      SecondaryIcon,
      iconClassName,
      secondaryIconClassName,
      containerClassName,
      size,
      kind,
      disabled,
      clicked,
      onClick,
      ...props
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const onClickMemo = useCallback(
      (e: any) => {
        onClick && !disabled && onClick(e);
      },
      [onClick, disabled]
    );

    return (
      <button
        {...props}
        ref={ref}
        className={containerVariant({
          size,
          kind,
          disabled: !!disabled,
          hasIcon: !!Icon,
          clicked: !!clicked,
          className: containerClassName,
        })}
        data-event-category={'button'}
        type={type === 'submit' ? 'submit' : 'button'}
        onClick={onClickMemo}>
        {!!Icon && <Icon className={iconVariant({ size, kind, className: iconClassName })} />}
        <span>{value}</span>
        {!!SecondaryIcon && (
          <SecondaryIcon
            className={secondaryIconVariant({ size, kind, className: secondaryIconClassName })}
          />
        )}
        {!!count && <span className={countVariant({ size, kind })}>{formatCount(count)}</span>}
      </button>
    );
  }
);

export const Button = memo(Button_);

export interface LinkButtonProps extends ComponentProps<typeof Link> {
  size: ButtonSize;
  value: string;
  count?: number;
  clicked?: boolean;
  Icon?: ComponentType<any>;
  SecondaryIcon?: ComponentType<any>;
  iconClassName?: string;
  secondaryIconClassName?: string;
  containerClassName?: string;
  kind: ButtonKind;
  disabled?: boolean;
  onClick?: any;
}

const LinkButton_ = forwardRef(
  (
    {
      value,
      count,
      Icon,
      SecondaryIcon,
      iconClassName,
      secondaryIconClassName,
      containerClassName,
      size,
      kind,
      disabled,
      clicked,
      onClick,
      ...props
    }: LinkButtonProps,
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    const onClickMemo = useCallback(
      (e: MouseEvent) => {
        onClick && !disabled && onClick(e);
      },
      [onClick, disabled]
    );

    return (
      <Link
        {...props}
        ref={ref}
        className={containerVariant({
          size,
          kind,
          disabled: !!disabled,
          hasIcon: !!Icon,
          clicked: !!clicked,
          className: containerClassName,
        })}
        onClick={onClickMemo}>
        {!!Icon && <Icon className={iconVariant({ size, kind, className: iconClassName })} />}
        <span>{value}</span>
        {!!SecondaryIcon && (
          <SecondaryIcon
            className={secondaryIconVariant({ size, kind, className: secondaryIconClassName })}
          />
        )}
        {!!count && <span className={countVariant({ size, kind })}>{formatCount(count)}</span>}
      </Link>
    );
  }
);

export const LinkButton = memo(LinkButton_);
/*
TODO
Abstract the bodies of Button and LinkButton to be the same
 */
