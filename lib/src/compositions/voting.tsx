import { suspensify } from '@elements/components/suspensify';
import type { Size } from '@elements/components/voting';
import { UpVoting as RawUpVoting, Voting as RawVoting } from '@elements/components/voting';
import { useDispatch, useValue } from '@elements/store';
import { useCallback } from 'react';
import type { LookupRef } from '@elements/types';

interface VotingProps {
  lookupRef: LookupRef;
  size: Size;
  downvoteTooltipText?: string;
  upvoteTooltipText?: string;
}

export const Voting = suspensify(
  ({ lookupRef, size, downvoteTooltipText, upvoteTooltipText }: VotingProps) => {
    const count = useValue('voting.vote/count', { ref: lookupRef });
    const kind = useValue('voting.current.user.vote/kind', { ref: lookupRef });

    const upvote = useDispatch('voting.current.user/upvote');
    const downvote = useDispatch('voting.current.user/downvote');

    const onUpvote = useCallback(async () => await upvote({ ref: lookupRef }), [lookupRef, upvote]);
    const onDownvote = useCallback(
      async () => await downvote({ ref: lookupRef }),
      [lookupRef, downvote]
    );

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
  lookupRef: LookupRef;
  size: Size;
  upvoteTooltipText?: string;
}

export const UpVoting = suspensify(({ lookupRef, size, upvoteTooltipText }: UpvotingProps) => {
  const count = useValue('voting.vote/count', { ref: lookupRef });
  const kind = useValue('voting.current.user.vote/kind', { ref: lookupRef });

  const upvote = useDispatch('voting.current.user/upvote');

  const onUpvote = useCallback(async () => await upvote({ ref: lookupRef }), [lookupRef, upvote]);

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
