import { evt, invalidateAsyncSub, remoteSub, sub } from '@elements/store';
import { EntityType } from '@elements/types';
import { rpcPost } from '@elements/rpc';

export enum RelationType {
  Resolves = 'relation.type/resolves',
  PartiallyResolves = 'relation.type/partially-resolves',
  Relates = 'relation.type/relates',
}

export type Subs = {
  'relationship/ids': {
    params: {
      'ref/id': string;
    };
    result: string[];
  };
  'relationship.entity/type': {
    params: { 'relation/id': string };
    result: EntityType;
  };
  'relationship.entity/title': {
    params: { 'relation/id': string };
    result: string;
  };
  'relationship/relation': {
    params: { 'relation/id': string };
    result: RelationType;
  };
  'relationship/adding': {
    params: {};
    result: boolean;
  };
  'relationship.deletion/id': {
    params: {};
    result: string;
  };
};

export type Events = {
  'relationship.adding/set': {
    params: { value: boolean };
  };
  'relationship/add': {
    params: {
      'relationship/relation': string;
      'relationship.from.entity/id': string;
      'relationship.to.entity/id': string;
    };
  };
  'relationship.deletion/start': {
    params: { 'relationship/id': string };
  };
  'relationship.deletion/cancel': {
    params: { 'relationship/id': string };
  };
  'relationship/delete': {
    params: { 'relationship/id': string; 'ref/id': string };
  };
};

export const relationshipSlice = () => ({
  'relationship/state': {
    'relationship/adding': false,
    'relationship.deletion/id': null,
  },
});

sub('relationship/adding', ({ state }) => state['relationship/state']['relationship/adding']);
sub(
  'relationship.deletion/id',
  ({ state }) => state['relationship/state']['relationship.deletion/id']
);

remoteSub('relationship/ids');
remoteSub('relationship.entity/title');
remoteSub('relationship.entity/type');
remoteSub('relationship/relation');

evt('relationship.adding/set', ({ setState, params }) => {
  setState((state: any) => {
    state['relationship/state']['relationship/adding'] = params.value;
  });
});

evt('relationship/add', async ({ setState, params }) => {
  await rpcPost('relationship/add', params);

  setState((state: any) => {
    state['relationship/state']['relationship/adding'] = false;
  });

  await invalidateAsyncSub('relationship/ids', { 'ref/id': params['relationship.from.entity/id'] });
});

evt('relationship.deletion/start', ({ setState, params }) => {
  setState((state: any) => {
    state['relationship/state']['relationship.deletion/id'] = params['relationship/id'];
  });
});

evt('relationship.deletion/cancel', ({ setState }) => {
  setState((state: any) => {
    state['relationship/state']['relationship.deletion/id'] = null;
  });
});

evt('relationship/delete', async ({ params, setState }) => {
  await rpcPost('relationship/delete', { 'relationship/id': params['relationship/id'] });

  await invalidateAsyncSub('relationship/ids', { 'ref/id': params['ref/id'] });

  setState((state: any) => {
    state['relationship/state']['relationship.deletion/id'] = null;
  });
});
