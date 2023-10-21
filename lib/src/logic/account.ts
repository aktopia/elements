import { evt, invalidateAsyncSubs } from '@elements/store';
import {
  endEditing,
  registerTextEditor,
  startEditing,
  text,
  updateText,
} from '@elements/logic/text-editor';
import { rpcPost } from '@elements/rpc';

export type Events = {
  'account.user.name/edit': {
    params: {
      'user/id': string;
    };
  };
};

export const accountSlice = () => ({
  'account/state': {},
});

evt('account.user.name/edit', ({ setState, params }) => {
  startEditing({ setState, params: { 'ref/id': params['user/id'], 'ref/attribute': 'user/name' } });
});

registerTextEditor('user/name', {
  onTextUpdate: updateText,
  onEditDone: async ({ setState, getState, params }) => {
    const value = text({ state: getState(), params });
    await rpcPost('user.name/update', {
      'user/id': params['ref/id'],
      value,
    });
    await invalidateAsyncSubs([
      ['current.user/name'],
      ['user/name', { 'user/id': params['ref/id'] }],
    ]);
    endEditing({ setState, getState, params });
  },
  onEditCancel: endEditing,
});
