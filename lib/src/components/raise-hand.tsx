import { HandRaisedOutline, HandRaisedSolid } from '@elements/icons';
import { cva } from '@elements/utils/style';
import { formatCount } from '@elements/utils';
import { WithInfoTooltip } from '@elements/components/info-tooltip';
import { useWrapWaiting } from '@elements/store/hooks';

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
    waiting: {
      true: 'animate-pulse',
      false: '',
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
    waiting: {
      true: 'animate-pulse',
      false: '',
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
  onRaiseHand: () => Promise<void>;
  raised: boolean;
  size: Size;
  tooltipText: string;
}

export const RaiseHand = ({ count, onRaiseHand, size, raised, tooltipText }: RaiseHandProps) => {
  const [onRaiseHand_, raiseHandWaiting] = useWrapWaiting(onRaiseHand, false, [onRaiseHand]);
  const Icon = raised ? HandRaisedSolid : HandRaisedOutline;
  return (
    <WithInfoTooltip text={tooltipText}>
      <button className={containerVariant({ size })} type={'button'} onClick={onRaiseHand_}>
        <Icon className={iconVariant({ size, active: raised, waiting: raiseHandWaiting })} />
        <p className={countVariant({ size, active: raised, waiting: raiseHandWaiting })}>
          {formatCount(count)}
        </p>
      </button>
    </WithInfoTooltip>
  );
};
