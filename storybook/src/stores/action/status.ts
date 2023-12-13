import { ActionStatus } from '@elements/logic/action';

export const store = {
  sub: {
    'action.status/modal': { visible: true, 'action/id': '' },
    'action/status': ActionStatus.Active,
    'action.status/can-update': false,
    'action/id': '',
  },
  evt: ['action.status.modal/close', 'action.status.modal/open', 'action.status/update'],
};
