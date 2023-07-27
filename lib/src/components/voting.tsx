import { ArrowSmallDownSolid, ArrowSmallUpSolid } from '@elements/_icons';
import { cva } from 'cva';

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
      true: 'text-blue-600',
      false: 'text-gray-400',
    },
  },
});

const containerVariant = cva('flex items-center', {
  variants: {
    size: {
      xs: 'gap-2',
      sm: 'gap-2.5',
      md: 'gap-2.5',
    },
  },
});

export type Kind = 'upvote' | 'downvote' | null;

export type Size = 'xs' | 'sm' | 'md';

interface VoteProps {
  count: number;
  onUpvote: () => void;
  onDownvote: () => void;
  kind: Kind;
  size: Size;
}

export const Voting = ({ count, onUpvote, onDownvote, kind, size }: VoteProps) => {
  return (
    <div className={containerVariant({ size })}>
      <button type={'button'} onClick={onUpvote}>
        <ArrowSmallUpSolid className={voteVariant({ size, active: kind === 'upvote' })} />
      </button>
      <p className={countVariant({ size, active: !!kind })}>{count}</p>
      <button type={'button'} onClick={onDownvote}>
        <ArrowSmallDownSolid className={voteVariant({ size, active: kind === 'downvote' })} />
      </button>
    </div>
  );
};
