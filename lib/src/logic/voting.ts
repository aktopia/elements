import { evt, invalidateAsyncSubs, remoteSub } from '@elements/store';
import { rpcPost } from '@elements/rpc';
import { wrapRequireAuth } from '@elements/logic/authentication';
import type { LookupRef } from '@elements/types';
import type { Evt, Sub } from '@elements/store/types';

export type Kind = 'upvote' | 'downvote' | null;

export const votingSlice = () => ({
  'voting/state': {},
});

export type Subs = {
  'voting.vote/count': Sub<{ ref: LookupRef }, number>;
  'voting.current.user.vote/kind': Sub<{ ref: LookupRef }, Kind>;
};

export type Events = {
  'voting.current.user/upvote': Evt<{ ref: LookupRef }>;
  'voting.current.user/downvote': Evt<{ ref: LookupRef }>;
};

remoteSub('voting.vote/count');
remoteSub('voting.current.user.vote/kind');

evt(
  'voting.current.user/upvote',
  wrapRequireAuth(async ({ params }) => {
    await rpcPost('voting.current.user/upvote', params);
    await invalidateAsyncSubs([
      ['voting.vote/count', params],
      ['voting.current.user.vote/kind', params],
    ]);
  })
);

evt(
  'voting.current.user/downvote',
  wrapRequireAuth(async ({ params }) => {
    await rpcPost('voting.current.user/downvote', params);
    await invalidateAsyncSubs([
      ['voting.vote/count', params],
      ['voting.current.user.vote/kind', params],
    ]);
  })
);
