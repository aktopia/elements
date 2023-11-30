import { evt, invalidateAsyncSub, remoteSub, sub } from '@elements/store';
import type { EntityType, Ident } from '@elements/types';
import { rpcPost } from '@elements/rpc';
import type { Evt, Sub } from '@elements/store/types';

export enum RelationType {
  Resolves = 'relation.type/resolves',
  PartiallyResolves = 'relation.type/partially-resolves',
  Relates = 'relation.type/relates',
}

export type Subs = {
  'relationship/ids': Sub<{ 'relationship.from/ref': Ident }, string[]>;
  'relationship.to.entity/type': Sub<{ 'relationship/id': string }, EntityType>;
  'relationship.to/title': Sub<{ 'relationship/id': string }, string>;
  'relationship/relation': Sub<{ 'relationship/id': string }, RelationType>;
  'relationship/adding': Sub<{}, boolean>;
  'relationship/can-create': Sub<{ 'relationship.from/ref': Ident }, boolean>;
  'relationship/can-delete': Sub<{ 'relationship.from/ref': Ident }, boolean>;
};

export type Events = {
  'relationship.adding/set': Evt<{ value: boolean }>;
  'relationship/add': Evt<{
    'relationship/relation': RelationType;
    'relationship.from/ref': Ident;
    'relationship.to/ref': Ident;
  }>;
  'relationship/delete': Evt<{ 'relationship/id': string; 'relationship.from/ref': Ident }>;
};

export const relationshipSlice = () => ({
  'relationship/state': {
    'relationship/adding': false,
    'relationship.deletion/id': null,
  },
});

sub('relationship/adding', ({ state }) => state['relationship/state']['relationship/adding']);

remoteSub('relationship/ids');
remoteSub('relationship.to/title');
remoteSub('relationship.to.entity/type');
remoteSub('relationship/relation');
remoteSub('relationship/can-create');
remoteSub('relationship/can-delete');

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

  await invalidateAsyncSub([
    'relationship/ids',
    {
      'relationship.from/ref': params['relationship.from/ref'],
    },
  ]);
});

evt('relationship/delete', async ({ params, setState }) => {
  await rpcPost('relationship/delete', { 'relationship/id': params['relationship/id'] });

  await invalidateAsyncSub([
    'relationship/ids',
    {
      'relationship.from/ref': params['relationship.from/ref'],
    },
  ]);

  setState((state: any) => {
    state['relationship/state']['relationship.deletion/id'] = null;
  });
});
