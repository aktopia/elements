import type { VariantProps } from '@elements/utils/style';
import { cva } from '@elements/utils/style';

const variant = cva('animate-spin', {
  variants: {
    size: {
      xs: 'h-5 w-5',
      sm: 'h-8 w-8',
    },
    kind: {
      primary: 'text-blue-500',
      secondary: 'text-gray-400',
    },
    defaultVariants: {
      kind: 'primary',
      size: 'sm',
    },
  },
});

interface SpinnerProps extends VariantProps<typeof variant> {
  visible: boolean;
}

export const Spinner = ({ visible, size, kind }: SpinnerProps) => {
  return visible ? (
    <svg className={variant({ size, kind })} fill={'none'} viewBox={'0 0 24 24'}>
      <circle
        className={'opacity-20'}
        cx={'12'}
        cy={'12'}
        r={'10'}
        stroke={'currentColor'}
        strokeWidth={'4'}
      />
      <path
        d={
          'M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        }
        fill={'currentColor'}
      />
    </svg>
  ) : null;
};

/*
TODO
sizes
types
 */
