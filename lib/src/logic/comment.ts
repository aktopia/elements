import { evt, remoteSub, sub } from '@elements/store';

export const commentSlice = () => ({
  'comment/state': {
    'comment.deletion/id': null,
  },
});

export type Subs = {
  'comment/status': {
    params: {
      'comment/id': string;
    };
    result: string;
  };
  'comment/creator-name': {
    params: {
      'comment/id': string;
    };
    result: string;
  };
  'comment/created-at': {
    params: {
      'comment/id': string;
    };
    result: number;
  };
  'comment/text': {
    params: {
      'comment/id': string;
    };
    result: string;
  };
  'comment/ids': {
    params: {
      'ref/id': string;
      'ref/attribute': string;
    };
    result: string[];
  };
  'comment.deletion/id': {
    params: {};
    result: string;
  };
};

remoteSub('comment/status');
remoteSub('comment/creator-name');
remoteSub('comment/created-at');
remoteSub('comment/text');
remoteSub('comment/ids');

sub('comment.deletion/id', ({ state }) => state['comment/state']['comment.deletion/id']);

evt('new.comment/post', ({ setState, params }) => null);
evt('new.comment/update', ({ setState, params }) => null);
evt('comment.deletion/cancel', ({ setState, params }) => null);
evt('comment.deletion/start', ({ setState, params }) => null);
evt('comment/delete', ({ setState, params }) => null);
