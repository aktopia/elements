import { suspensify } from '@elements/components/suspensify';
import { Kind, Size, Voting as PureVoting } from '@elements/components/voting';
import { useDispatch, useValue } from '@elements/store';
import { useCallback, useMemo } from 'react';

export const Voting = suspensify(
  ({ refAttribute, refId, size }: { refAttribute: string; refId: string; size: Size }) => {
    const userId = useValue('current.user/id');
    const reference = useMemo(
      () => ({ 'ref/id': refId, 'ref/attribute': refAttribute }),
      [refId, refAttribute]
    );

    const count = useValue<number>('vote/count', reference);
    const kind = useValue<Kind>('vote/kind', { ...reference, 'user/id': userId });

    const upvote = useDispatch('vote/upvote');
    const downvote = useDispatch('vote/downvote');

    const onUpvote = useCallback(
      () => upvote({ ...reference, 'user/id': userId }),
      [reference, upvote, userId]
    );
    const onDownvote = useCallback(
      () => downvote({ ...reference, 'user/id': userId }),
      [reference, downvote, userId]
    );

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
