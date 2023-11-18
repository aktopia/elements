import { HandRaisedOutline, HandRaisedSolid } from '@elements/icons';
import { cva } from 'cva';
import { formatCount } from '@elements/utils';
import { WithInfoTooltip } from '@elements/components/info-tooltip';

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
      md: 'text-md font-medium',
    },
    active: {
      true: 'text-rose-600',
      false: 'text-gray-600 group-hover:text-rose-600',
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
  tooltipText: string;
}

export const RaiseHand = ({ count, onClick, size, raised, tooltipText }: RaiseHandProps) => {
  const Icon = raised ? HandRaisedSolid : HandRaisedOutline;
  return (
    <WithInfoTooltip text={tooltipText}>
      <button className={containerVariant({ size })} type={'button'} onClick={onClick}>
        <Icon className={iconVariant({ size, active: raised })} />
        <p className={countVariant({ size, active: raised })}>{formatCount(count)}</p>
      </button>
    </WithInfoTooltip>
  );
};
