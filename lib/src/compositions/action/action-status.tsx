import { ActionStatus as ActionStatusEnum } from '@elements/logic/action';
import { suspensify } from '@elements/components/suspensify';
import { useTranslation } from '@elements/translation';
import { useDispatch, useValue } from '@elements/store/interface';
import type { Colors } from '@elements/components/status-button';
import { StatusButton } from '@elements/components/status-button';
import { Modal, ModalHeader, ModalPanel } from '@elements/components/modal';
import { Button } from '@elements/components/button';
import { useCallback } from 'react';

const colorMapping: Record<ActionStatusEnum, Colors> = {
  [ActionStatusEnum.Draft]: 'gray',
  [ActionStatusEnum.Reviewing]: 'blue',
  [ActionStatusEnum.Active]: 'green',
  [ActionStatusEnum.Completed]: 'indigo',
};

const DraftModalContent = ({ onClose, visible }: any) => {
  const t = useTranslation();
  const actionId = useValue('current.action/id');
  const updateStatus = useDispatch('action.status/update');
  const onPushForReview = useCallback(() => {
    updateStatus({ 'action/id': actionId, status: ActionStatusEnum.Reviewing });
  }, [updateStatus, actionId]);

  return (
    <Modal visible={visible} onClose={onClose}>
      <ModalPanel>
        <div className={'flex flex-col gap-6 p-6 w-full md:w-[500px]'}>
          <ModalHeader title={'Action Status - Draft'} onClose={onClose} />
          <div>
            <ul className={'list-disc list-inside space-y-3'}>
              <p className={'text-gray-600 text-sm'}>
                {'The action is currently in draft. It can be pushed for public review once ready.'}
              </p>
              <div className={'space-y-2'}>
                <p className={'text-gray-600 font-medium'}>{'When the action is up for review'}</p>
                <div className={'[&>li]:text-gray-600 [&>li]:text-sm'}>
                  <li>{'It will be publicly available in search and feeds.'}</li>
                  <li>{'It can be edited anytime to accommodate feedback.'}</li>
                  <li>{'If the action is not viable, it can be deleted at anytime.'}</li>
                  <li>{'It cannot be moved back to draft.'}</li>
                  <li>{'People cannot fund it yet.'}</li>
                </div>
              </div>
            </ul>
          </div>
          <div className={'flex justify-center mt-3'}>
            <Button
              kind={'primary'}
              size={'sm'}
              value={'Push for Review'}
              onClick={onPushForReview}
            />
          </div>
        </div>
      </ModalPanel>
    </Modal>
  );
};

const InReviewModalContent = ({ onClose, visible }: any) => {
  const actionId = useValue('current.action/id');
  const updateStatus = useDispatch('action.status/update');
  const onPublish = useCallback(() => {
    updateStatus({ 'action/id': actionId, status: ActionStatusEnum.Active });
  }, [updateStatus, actionId]);

  return (
    <Modal visible={visible} onClose={onClose}>
      <ModalPanel>
        <div className={'flex flex-col gap-6 p-6 w-full md:w-[500px]'}>
          <ModalHeader title={'Action Status - In Review'} onClose={onClose} />
          <div>
            <ul className={'list-disc list-inside space-y-3'}>
              <p className={'text-gray-600 text-sm'}>
                {
                  'The action is currently in review. It can be published to kickstart the work and funding.'
                }
              </p>
              <div className={'space-y-2'}>
                <p className={'text-gray-600 font-medium'}>{'When the action is published'}</p>
                <div className={'[&>li]:text-gray-600 [&>li]:text-sm'}>
                  <li>{'It cannot be edited or deleted.'}</li>
                  <li>{'It cannot be moved back to review.'}</li>
                  <li>{'Work on the action can start.'}</li>
                  <li>{'The community can start funding it.'}</li>
                </div>
              </div>
            </ul>
          </div>
          <div className={'flex justify-center mt-3'}>
            <Button kind={'success'} size={'md'} value={'Publish'} onClick={onPublish} />
          </div>
        </div>
      </ModalPanel>
    </Modal>
  );
};

const ActiveModalContent = ({ onClose, visible }: any) => {
  return (
    <Modal visible={visible} onClose={onClose}>
      <ModalPanel>
        <div className={'flex flex-col gap-6 p-6 w-full md:w-[500px]'}>
          <ModalHeader title={'Action Status - Active'} onClose={onClose} />
          <p className={'text-gray-600 text-sm'}>
            {
              'The action is being actively worked on. The community can support by volunteering or funding.'
            }
          </p>
        </div>
      </ModalPanel>
    </Modal>
  );
};

const modalMapping = {
  [ActionStatusEnum.Draft]: DraftModalContent,
  [ActionStatusEnum.Reviewing]: InReviewModalContent,
  [ActionStatusEnum.Active]: ActiveModalContent,
  [ActionStatusEnum.Completed]: InReviewModalContent,
};

export const ActionStatusModal = suspensify(() => {
  const actionId = useValue('current.action/id');
  const status = useValue('action/status', { 'action/id': actionId });
  const visible = useValue('action.status.modal/visible');
  const onClose = useDispatch('action.status.modal/close');
  const Component = modalMapping[status];
  return <Component visible={visible} onClose={onClose} />;
});

export const ActionStatusButton = suspensify(() => {
  const t = useTranslation();
  const actionId = useValue('current.action/id');
  const status = useValue('action/status', { 'action/id': actionId });
  const color = colorMapping[status];

  const onClick = useDispatch('action.status.modal/open');

  return (
    <>
      <ActionStatusModal />
      <StatusButton color={color} name={t(status)} onClick={onClick} />
    </>
  );
});
