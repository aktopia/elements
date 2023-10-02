import { remoteSub } from '@elements/store';

export type Subs = {
  'entity/updated-at': {
    params: {
      'entity/id': string;
    };
    result: number;
  };
  'entity.created-by/name': {
    params: {
      'entity/id': string;
    };
    result: string;
  };
};

export const entitySlice = () => ({});

remoteSub('entity/updated-at');
remoteSub('entity.created-by/name');
