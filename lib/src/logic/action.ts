import { dispatch, evt, invalidateAsyncSub, remoteSub, sub } from '@elements/store';
import { rpcPost } from '@elements/rpc';
import { navigate } from '@elements/logic/router';
import {
  endEditing,
  registerTextEditor,
  startEditing,
  text,
  updateText,
} from '@elements/logic/text-editor';

export const actionSlice = () => ({
  'action/state': {
    'action.tabs/active-tab': 'home',
    'action.progress-bar/active-switch': 'work',
    'action.create.modal/visible': false,
    'action.create.modal/title': '',
  },
});

sub('action.tabs/active-tab-id', ({ state }) => state['action/state']['action.tabs/active-tab']);

sub(
  'action.progress-bar/active-switch-id',
  ({ state }) => state['action/state']['action.progress-bar/active-switch']
);

remoteSub('action/title');
remoteSub('action/description');
remoteSub('action/outcome');

sub('action.funding/percentage', ({ state }) => 24);
sub('action/saved', ({ state }) => false);
sub('action/followed', ({ state }) => false);
sub('action.bump/count', ({ state }) => '10');
sub('action.follow/count', ({ state }) => '2600');
sub('action.work/percentage', ({ state }) => '23');
sub('action/last-active-at', ({ state }) => '');
sub('current.action/id', ({ state }) => state['action/state']['current.action/id']);

sub('action.create.modal/title', ({ state }) => state['action/state']['action.create.modal/title']);

sub(
  'action.create.modal/visible',
  ({ state }) => state['action/state']['action.create.modal/visible']
);

sub('action.title/can-edit', ({ state }) => true);

sub('action.description/can-edit', ({ state }) => true);

sub('action.outcome/can-edit', ({ state }) => true);

evt('action.title/edit', ({ setState, getState }) => {
  const currenActionId = getState()['action/state']['current.action/id'];

  startEditing({
    setState,
    params: { 'ref/id': currenActionId, 'ref/attribute': 'action.title/text' },
  });
});

evt('action.description/edit', ({ setState, getState }) => {
  const currenActionId = getState()['action/state']['current.action/id'];

  startEditing({
    setState,
    params: { 'ref/id': currenActionId, 'ref/attribute': 'action.description/text' },
  });
});

evt('action.outcome/edit', ({ setState, getState }) => {
  const currenActionId = getState()['action/state']['current.action/id'];

  startEditing({
    setState,
    params: { 'ref/id': currenActionId, 'ref/attribute': 'action.outcome/text' },
  });
});

evt('current.action.id/set', ({ setState, params }) => {
  setState((state: any) => {
    state['action/state']['current.action/id'] = params['action/id'];
  });
});

evt('action/volunteer', ({ setState, params }) => null);
evt('action/follow', ({ setState, params }) => null);
evt('action/unfollow', ({ setState, params }) => null);
evt('action/save', ({ setState, params }) => null);
evt('action/unsave', ({ setState, params }) => null);
evt('action/bump', ({ setState, params }) => null);
evt('action/unbump', ({ setState, params }) => null);
evt('action/fund', ({ setState, params }) => null);
evt('action.progress-bar/update', ({ setState, params }) => null);

evt('action.tabs/update', ({ setState, params }) => {
  setState((state: any) => {
    state['action/state']['action.tabs/active-tab'] = params['tab/id'];
  });
});

evt('action.create.modal/open', ({ setState }) => {
  setState((state: any) => {
    state['action/state']['action.create.modal/visible'] = true;
  });
});

evt('action.create.modal/close', ({ setState }) => {
  setState((state: any) => {
    state['action/state']['action.create.modal/visible'] = false;
  });
});

evt('action.create.modal/create', ({ setState }) => {
  setState((state: any) => {
    state['action/state']['action.create.modal/title'] = '';
    state['action/state']['action.create.modal/visible'] = false;
  });
});

evt('action.create.modal.title/update', ({ setState, params }) => {
  setState((state: any) => {
    state['action/state']['action.create.modal/title'] = params.value;
  });
});

registerTextEditor('action.title/text', {
  onTextUpdate: updateText,
  onEditDone: async ({ setState, getState, params }) => {
    const title = text({ state: getState(), params });
    await rpcPost('action.title.text/update', {
      'action/id': params['ref/id'],
      value: title,
    });
    await invalidateAsyncSub('action/title', { 'action/id': params['ref/id'] });
    endEditing({ setState, getState, params });
  },
  onEditCancel: endEditing,
});

registerTextEditor('action.description/text', {
  onTextUpdate: updateText,
  onEditDone: async ({ setState, getState, params }) => {
    const description = text({ state: getState(), params });
    await rpcPost('action.description.text/update', {
      'action/id': params['ref/id'],
      value: description,
    });
    await invalidateAsyncSub('action/description', { 'action/id': params['ref/id'] });
    endEditing({ setState, getState, params });
  },
  onEditCancel: endEditing,
});

registerTextEditor('action.outcome/text', {
  onTextUpdate: updateText,
  onEditDone: async ({ setState, getState, params }) => {
    const outcome = text({ state: getState(), params });
    await rpcPost('action.outcome.text/update', {
      'action/id': params['ref/id'],
      value: outcome,
    });
    await invalidateAsyncSub('action/outcome', { 'action/id': params['ref/id'] });
    endEditing({ setState, getState, params });
  },
  onEditCancel: endEditing,
});

export const onActionViewNavigate = (route: any) => {
  const id = route.params.id;
  dispatch('current.action.id/set', { 'action/id': id });
};

export const onActionNewNavigate = async (route: any) => {
  const { title } = route.params;
  const { id } = await rpcPost('action.draft/create', { 'action/title': title });
  navigate({ id: 'action/view', replace: true, params: { id } });
};
