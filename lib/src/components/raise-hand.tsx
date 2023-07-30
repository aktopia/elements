import { HandRaisedOutline, HandRaisedSolid } from '@elements/_icons';
import { cva } from 'cva';

const iconVariant = cva('', {
  variants: {
    size: {
      xs: 'h-5 w-5',
      sm: 'h-6 w-6',
      md: 'h-7 w-7',
    },
    active: {
      true: 'text-rose-600',
      false: 'text-gray-400 group-hover:text-rose-600',
    },
  },
  defaultVariants: {
    size: 'sm',
    active: false,
  },
});

const countVariant = cva('', {
  variants: {
    size: {
      xs: 'text-xs font-semibold',
      sm: 'text-sm font-medium',
      md: 'text-md',
    },
    active: {
      true: 'text-rose-600',
      false: 'text-gray-400 group-hover:text-rose-600',
    },
  },
});

const containerVariant = cva('flex items-center group', {
  variants: {
    size: {
      xs: 'gap-2',
      sm: 'gap-2',
      md: 'gap-2.5',
    },
  },
});

export type Size = 'xs' | 'sm' | 'md';

interface RaiseHandProps {
  count: number;
  onClick: () => void;
  raised: boolean;
  size: Size;
}

export const RaiseHand = ({ count, onClick, size, raised }: RaiseHandProps) => {
  const Icon = raised ? HandRaisedSolid : HandRaisedOutline;
  return (
    <div className={containerVariant({ size })}>
      <button type={'button'} onClick={onClick}>
        <Icon className={iconVariant({ size, active: raised })} />
      </button>
      <p className={countVariant({ size, active: raised })}>{count}</p>
    </div>
  );
};
