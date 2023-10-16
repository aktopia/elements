import { suspensify } from '@elements/components/suspensify';
import type { Size } from '@elements/components/voting';
import { Voting as RawVoting, UpVoting as RawUpVoting } from '@elements/components/voting';
import { useDispatch, useValue } from '@elements/store';
import { useCallback } from 'react';
import type { LookupRef } from '@elements/types';

export const Voting = suspensify(({ lookupRef, size }: { lookupRef: LookupRef; size: Size }) => {
  const count = useValue('voting.vote/count', { ref: lookupRef });
  const kind = useValue('voting.current.user.vote/kind', { ref: lookupRef });

  const upvote = useDispatch('voting.current.user/upvote');
  const downvote = useDispatch('voting.current.user/downvote');

  const onUpvote = useCallback(() => upvote({ ref: lookupRef }), [lookupRef, upvote]);
  const onDownvote = useCallback(() => downvote({ ref: lookupRef }), [lookupRef, downvote]);

  return (
    <RawVoting count={count} kind={kind} size={size} onDownvote={onDownvote} onUpvote={onUpvote} />
  );
});

export const UpVoting = suspensify(({ lookupRef, size }: { lookupRef: LookupRef; size: Size }) => {
  const count = useValue('voting.vote/count', { ref: lookupRef });
  const kind = useValue('voting.current.user.vote/kind', { ref: lookupRef });

  const upvote = useDispatch('voting.current.user/upvote');

  const onUpvote = useCallback(() => upvote({ ref: lookupRef }), [lookupRef, upvote]);

  return <RawUpVoting count={count} kind={kind} size={size} onUpvote={onUpvote} />;
});
