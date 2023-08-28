import { evt, invalidateAsyncSubs, remoteSub } from '@elements/store';

import { rpcPost } from '@elements/rpc';

export type Kind = 'upvote' | 'downvote' | null;

export const votingSlice = () => ({
  'voting/state': {},
});

export type Subs = {
  'voting.vote/count': {
    params: {
      'ref/id': string;
      'ref/attribute': string;
    };
    result: number;
  };
  'voting.current.user.vote/kind': {
    params: {
      'ref/id': string;
      'ref/attribute': string;
    };
    result: Kind;
  };
};

export type Events = {
  'voting.current.user/upvote': {
    params: {
      'ref/id': string;
      'ref/attribute': string;
    };
  };
  'voting.current.user/downvote': {
    params: {
      'ref/id': string;
      'ref/attribute': string;
    };
  };
};

remoteSub('voting.vote/count');
remoteSub('voting.current.user.vote/kind');

evt('voting.current.user/upvote', async ({ params }) => {
  await rpcPost('voting.current.user/upvote', params);
  await invalidateAsyncSubs([
    ['voting.vote/count', params],
    ['voting.current.user.vote/kind', params],
  ]);
});

evt('voting.current.user/downvote', async ({ params }) => {
  await rpcPost('voting.current.user/downvote', params);
  await invalidateAsyncSubs([
    ['voting.vote/count', params],
    ['voting.current.user.vote/kind', params],
  ]);
});
