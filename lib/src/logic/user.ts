import { remoteSub } from '@elements/store';

export const userSlice = () => ({
  'user/state': {},
});

export type Subs = {
  'current.user/id': {
    params: {};
    result: string;
  };
  'current.user/name': {
    params: {};
    result: string;
  };
  'user/name': {
    params: {
      'user/id': string;
    };
    result: string;
  };
  'user/email': {
    params: {
      'user/id': string;
    };
    result: string;
  };
};

remoteSub('current.user/id');
remoteSub('current.user/name');
remoteSub('user/name');
remoteSub('user/email');
remoteSub('user.registration/pending');
