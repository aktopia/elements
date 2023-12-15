import { ActionStatus } from '@elements/logic/action';

const actionId = 'action-1';

export const store = {
  sub: {
    'action.status/modal': { visible: true, 'action/id': actionId },
    'action/status': ActionStatus.Active,
    'action.status/can-update': false,
    'action/id': actionId,
  },
  evt: ['action.status.modal/close', 'action.status.modal/open', 'action.status/update'],
};
