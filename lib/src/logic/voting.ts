import { evt, remoteSub } from '@elements/store';
import { rpcPost } from '@elements/rpc';
import { wrapRequireAuth } from '@elements/logic/authentication';
import type { Ident } from '@elements/types';
import type { Evt, Sub } from '@elements/store/types';
import { replaceAsyncSub } from '@elements/store/impl';

export type Kind = 'upvote' | 'downvote' | null;

export const votingSlice = () => ({
  'voting/state': {},
});

export type Subs = {
  'voting.vote/count': Sub<{ ident: Ident }, number>;
  'voting.user.vote/kind': Sub<{ ident: Ident; 'user/id': string }, Kind>;
};

export type Events = {
  'voting.current.user/upvote': Evt<{ ident: Ident }>;
  'voting.current.user/downvote': Evt<{ ident: Ident }>;
};

remoteSub('voting.vote/count');
remoteSub('voting.user.vote/kind');

evt(
  'voting.current.user/upvote',
  wrapRequireAuth(async ({ params, read }) => {
    const userId = read('current.user/id');
    const { 'voting.vote/count': count, 'voting.current.user.vote/kind': kind } = await rpcPost(
      'voting.current.user/upvote',
      params
    );

    replaceAsyncSub(['voting.vote/count', params], count);
    replaceAsyncSub(['voting.user.vote/kind', { ...params, 'user/id': userId }], kind);
  })
);

evt(
  'voting.current.user/downvote',
  wrapRequireAuth(async ({ params, read }) => {
    const userId = read('current.user/id');
    const { 'voting.vote/count': count, 'voting.current.user.vote/kind': kind } = await rpcPost(
      'voting.current.user/downvote',
      params
    );

    replaceAsyncSub(['voting.vote/count', params], count);
    replaceAsyncSub(['voting.user.vote/kind', { ...params, 'user/id': userId }], kind);
  })
);
