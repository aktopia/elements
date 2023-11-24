import { ArrowSmallDownSolid, ArrowSmallUpSolid } from '@elements/icons';
import { cva } from 'cva';
import type { Kind } from '@elements/logic/voting';
import { WithInfoTooltip } from '@elements/components/info-tooltip';
import { useWrapWaiting } from '@elements/store/hooks';

const voteVariant = cva('hover:text-blue-600', {
  variants: {
    size: {
      xs: 'h-5 w-5',
      sm: 'h-6 w-6',
      md: 'h-7 w-7',
    },
    active: {
      true: 'text-blue-600',
      false: 'text-gray-400',
    },
    waiting: {
      true: 'animate-pulse',
      false: '',
    },
  },
  defaultVariants: {
    size: 'sm',
    active: false,
    waiting: false,
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
      true: 'text-blue-600',
      false: 'text-gray-600',
    },
  },
});

const containerVariant = cva('flex items-center', {
  variants: {
    size: {
      xs: 'gap-1.5',
      sm: 'gap-2',
      md: 'gap-2.5',
    },
  },
});

export type Size = 'xs' | 'sm' | 'md';

interface VoteProps {
  count: number;
  onUpvote: () => Promise<void>;
  onDownvote: () => Promise<void>;
  kind: Kind;
  size: Size;
  downvoteTooltipText?: string;
  upvoteTooltipText?: string;
}

export const Voting = ({
  count,
  onUpvote,
  onDownvote,
  kind,
  size,
  upvoteTooltipText,
  downvoteTooltipText,
}: VoteProps) => {
  const [onUpvote_, upvoteWaiting] = useWrapWaiting(onUpvote, false, [onUpvote]);
  const [onDownvote_, downvoteWaiting] = useWrapWaiting(onDownvote, false, [onDownvote]);

  const waiting = upvoteWaiting || downvoteWaiting;

  return (
    <div className={containerVariant({ size })}>
      <WithInfoTooltip text={upvoteTooltipText}>
        <button disabled={waiting} type={'button'} onClick={onUpvote_}>
          <ArrowSmallUpSolid
            className={voteVariant({ size, active: kind === 'upvote', waiting: upvoteWaiting })}
          />
        </button>
      </WithInfoTooltip>
      <p className={countVariant({ size, active: !!kind })}>{count}</p>
      <WithInfoTooltip text={downvoteTooltipText}>
        <button disabled={waiting} type={'button'} onClick={onDownvote_}>
          <ArrowSmallDownSolid
            className={voteVariant({ size, active: kind === 'downvote', waiting: downvoteWaiting })}
          />
        </button>
      </WithInfoTooltip>
    </div>
  );
};

export const UpVoting = ({ count, onUpvote, kind, size }: Omit<VoteProps, 'onDownvote'>) => {
  const [onUpvote_, upvoteWaiting] = useWrapWaiting(onUpvote, false, [onUpvote]);

  return (
    <div className={containerVariant({ size })}>
      <button disabled={upvoteWaiting} type={'button'} onClick={onUpvote_}>
        <ArrowSmallUpSolid
          className={voteVariant({ size, active: kind === 'upvote', waiting: upvoteWaiting })}
        />
      </button>
      <p className={countVariant({ size, active: !!kind })}>{count}</p>
    </div>
  );
};
