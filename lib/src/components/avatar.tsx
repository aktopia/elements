import { UserCircleSolid } from '@elements/icons';
import { cva } from 'cva';
import { cx } from '@elements/utils';

const variant = cva('inline-block rounded-full', {
  variants: {
    size: {
      xs: 'h-6 w-6',
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-14 w-14',
    },
  },
});

export const Avatar = ({ src, size }: any) => {
  return src ? (
    <img alt={''} className={variant({ size })} src={src} />
  ) : (
    <UserCircleSolid className={cx(variant({ size }), 'text-gray-600')} />
  );
};

/*
Have fallback as initials
 */
