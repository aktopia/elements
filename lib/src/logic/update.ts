import { evt, invalidateAsyncSub, remoteSub, sub } from '@elements/store';
import { rpcPost } from '@elements/rpc';
import pick from 'lodash/pick';

export const updateSlice = () => ({
  'update/state': {
    'update.deletion/id': null,
    'new/update': {},
  },
});

export type Subs = {
  'update/ids': {
    params: {
      'ref/id': string;
      'ref/attribute': string;
    };
    result: string[];
  };
  'update/creator-name': {
    params: {
      'update/id': string;
    };
    result: string;
  };
  'update/created-at': {
    params: {
      'update/id': string;
    };
    result: number;
  };
  'update/text': {
    params: {
      'update/id': string;
    };
    result: string;
  };
  'update.deletion/id': {
    params: {};
    result: string;
  };
};

export type Events = {
  'new.update/create': {
    params: {
      'ref/id': string;
      'ref/attribute': string;
    };
  };
  'new.update/update': {
    params: {
      'ref/id': string;
      'ref/attribute': string;
      value: string;
    };
  };
  'update.deletion/cancel': {
    params: {};
  };
  'update.deletion/start': {
    params: {
      'update/id': string;
    };
  };
  'update/delete': {
    params: {
      'update/id': string;
      'ref/id': string;
      'ref/attribute': string;
    };
  };
};

sub('update.deletion/id', ({ state }) => state['update/state']['update.deletion/id']);

remoteSub('update/ids');
remoteSub('update/created-at');
remoteSub('update/creator-name');
remoteSub('update/text');

evt('new.update/create', async ({ getState }) => {
  const newUpdate = getState()['update/state']['new/update'];
  const reference = pick(newUpdate, ['ref/id', 'ref/attribute']);
  await rpcPost('update/create', {
    ...reference,
    value: newUpdate.text,
  });
  await invalidateAsyncSub('update/ids', reference);
});

evt('new.update/update', ({ setState, params }) => {
  setState((state: any) => {
    state['update/state']['new/update']['ref/id'] = params['ref/id'];
    state['update/state']['new/update']['ref/attribute'] = params['ref/attribute'];
    state['update/state']['new/update'].text = params.value;
  });
});

evt('update.deletion/cancel', ({ setState, params }) => {
  setState((state: any) => {
    state['update/state']['update.deletion/id'] = null;
  });
});

evt('update.deletion/start', ({ setState, params }) => {
  setState((state: any) => {
    state['update/state']['update.deletion/id'] = params['update/id'];
  });
});

evt('update/delete', async ({ setState, params }) => {
  await rpcPost('update/delete', {
    'update/id': params['update/id'],
  });

  setState((state: any) => {
    state['update/state']['update.deletion/id'] = null;
  });

  await invalidateAsyncSub('update/ids', {
    'ref/id': params['ref/id'],
    'ref/attribute': params['ref/attribute'],
  });
});
