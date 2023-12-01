import { evt, invalidateAsyncSubs } from '@elements/store';
import {
  endEditing,
  onEditCancelDefault,
  onTextUpdateDefault,
  registerTextEditor,
  startEditing,
  text,
} from '@elements/logic/text-editor';
import { rpcPost } from '@elements/rpc';
import type { Evt } from '@elements/store/types';

export type Events = {
  'account.user.name/edit': Evt<{ 'user/id': string }>;
};

export const accountSlice = () => ({
  'account/state': {},
});

evt('account.user.name/edit', ({ setState, params }) => {
  startEditing({ setState, params: { ref: ['user/name', params['user/id']] } });
});

registerTextEditor('user/name', {
  onTextUpdate: onTextUpdateDefault,
  onEditDone: async ({ setState, getState, params }) => {
    const value = text({ getState, params });
    await rpcPost('user.name/update', {
      'user/id': params.ref[1],
      value,
    });
    await invalidateAsyncSubs([['user/name', { 'user/id': params.ref[1] }]]);
    endEditing({ setState, getState, params });
  },
  onEditCancel: onEditCancelDefault,
});
