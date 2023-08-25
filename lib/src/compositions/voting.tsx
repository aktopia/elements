import { suspensify } from '@elements/components/suspensify';
import { Size, Voting as PureVoting } from '@elements/components/voting';
import { useDispatch, useValue } from '@elements/store';
import { useCallback, useMemo } from 'react';

export const Voting = suspensify(
  ({ refAttribute, refId, size }: { refAttribute: string; refId: string; size: Size }) => {
    const reference = useMemo(
      () => ({ 'ref/id': refId, 'ref/attribute': refAttribute }),
      [refId, refAttribute]
    );

    const count = useValue('voting.vote/count', reference);
    const kind = useValue('voting.current.user.vote/kind', reference);

    const upvote = useDispatch('voting.current.user/upvote');
    const downvote = useDispatch('voting.current.user/downvote');

    const onUpvote = useCallback(() => upvote(reference), [reference, upvote]);
    const onDownvote = useCallback(() => downvote(reference), [reference, downvote]);

    return (
      <PureVoting
        count={count}
        kind={kind}
        size={size}
        onDownvote={onDownvote}
        onUpvote={onUpvote}
      />
    );
  }
);
