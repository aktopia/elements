import { suspensify } from '@elements/components/suspensify';
import type { Size } from '@elements/components/voting';
import { UpVoting as RawUpVoting, Voting as RawVoting } from '@elements/components/voting';
import { useDispatch, useValue } from '@elements/store/interface';
import { useCallback } from 'react';
import type { Ident } from '@elements/types';

interface VotingProps {
  ident: Ident;
  size: Size;
  downvoteTooltipText?: string;
  upvoteTooltipText?: string;
}

export const Voting = suspensify(
  ({ ident, size, downvoteTooltipText, upvoteTooltipText }: VotingProps) => {
    const userId = useValue('current.user/id');
    const count = useValue('voting.vote/count', { ident });
    const kind = useValue('voting.user.vote/kind', { ident, 'user/id': userId });

    const upvote = useDispatch('voting.current.user/upvote');
    const downvote = useDispatch('voting.current.user/downvote');

    const onUpvote = useCallback(async () => await upvote({ ident }), [ident, upvote]);
    const onDownvote = useCallback(async () => await downvote({ ident }), [ident, downvote]);

    return (
      <RawVoting
        count={count}
        downvoteTooltipText={downvoteTooltipText}
        kind={kind}
        size={size}
        upvoteTooltipText={upvoteTooltipText}
        onDownvote={onDownvote}
        onUpvote={onUpvote}
      />
    );
  }
);

interface UpvotingProps {
  ident: Ident;
  size: Size;
  upvoteTooltipText?: string;
}

export const UpVoting = suspensify(({ ident, size, upvoteTooltipText }: UpvotingProps) => {
  const userId = useValue('current.user/id');
  const count = useValue('voting.vote/count', { ident });
  const kind = useValue('voting.user.vote/kind', { ident, 'user/id': userId });

  const upvote = useDispatch('voting.current.user/upvote');

  const onUpvote = useCallback(async () => await upvote({ ident }), [ident, upvote]);

  return (
    <RawUpVoting
      count={count}
      kind={kind}
      size={size}
      upvoteTooltipText={upvoteTooltipText}
      onUpvote={onUpvote}
    />
  );
});
