import { evt, remoteSub, sub } from '@elements/store/register';
import { rpcPost } from '@elements/rpc';
import { invalidateAsyncSub } from '@elements/store/impl';
import pick from 'lodash/pick';

export const updateSlice = () => ({
  'update/state': {
    'update.deletion/id': null,
    'new/update': {},
  },
});

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

evt('update.deletion/cancel', ({ setState, params }) => null);
evt('update.deletion/start', ({ setState, params }) => null);
evt('update/delete', ({ setState, params }) => null);
