import { remoteSub } from '@elements/store';

export type Subs = {
  'entity/updated-at': {
    params: {
      'entity/id': string;
    };
    result: number;
  };
};

export const entitySlice = () => ({});

remoteSub('entity/updated-at');
