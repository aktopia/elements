import { ActionStatus as ActionStatusEnum } from '@elements/logic/action';
import { suspensify } from '@elements/components/suspensify';
import { useTranslation } from '@elements/translation';
import { useDispatch, useValue } from '@elements/store/interface';
import type { Colors } from '@elements/components/status-button';
import { StatusButton } from '@elements/components/status-button';
import { Modal, ModalHeader, ModalPanel } from '@elements/components/modal';
import { Button } from '@elements/components/button';
import { useCallback } from 'react';
import { cx } from '@elements/utils';

const colorMapping: Record<ActionStatusEnum, Colors> = {
  [ActionStatusEnum.Draft]: 'gray',
  [ActionStatusEnum.Reviewing]: 'blue',
  [ActionStatusEnum.Active]: 'green',
  [ActionStatusEnum.Completed]: 'blue',
};

const states = [
  ActionStatusEnum.Draft,
  ActionStatusEnum.Reviewing,
  ActionStatusEnum.Active,
  ActionStatusEnum.Completed,
];

type StepStatus = 'complete' | 'current' | 'inactive';

interface Step {
  state: ActionStatusEnum;
  status: StepStatus;
}

export const Steps = ({ currentStatus }: { currentStatus: ActionStatusEnum }) => {
  const t = useTranslation();
  const [steps, _] = states.reduce<[Step[], boolean]>(
    ([steps, found], state) => {
      if (state === currentStatus) {
        return [[...steps, { state, status: 'current' }], true];
      }

      if (found) {
        return [[...steps, { state, status: 'inactive' }], true];
      }

      return [[...steps, { state, status: 'complete' }], false];
    },
    [[], false]
  );

  return (
    <ol className={'flex items-center'} role={'list'}>
      {steps.map((step, stepIdx) => (
        <li
          key={step.state}
          className={cx(stepIdx !== steps.length - 1 ? 'w-full' : '', 'relative')}>
          {step.status === 'complete' ? (
            <>
              <div aria-hidden={'true'} className={'absolute inset-0 flex items-center'}>
                <div className={'h-0.5 w-full bg-blue-600'} />
              </div>
              <div
                className={
                  'relative flex h-4 w-4 items-center justify-center rounded-full bg-blue-600'
                }>
                <span className={'absolute top-5 text-xs text-gray-600 font-medium'}>
                  {t(step.state)}
                </span>
              </div>
            </>
          ) : step.status === 'current' ? (
            <>
              <div aria-hidden={'true'} className={'absolute inset-0 flex items-center'}>
                <div className={'h-0.5 w-full bg-gray-200'} />
              </div>
              <div
                aria-current={'step'}
                className={
                  'relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-blue-600 bg-white'
                }>
                <span aria-hidden={'true'} className={'h-1.5 w-1.5 rounded-full bg-blue-600'} />
                <span className={'absolute top-5 text-xs text-gray-600 font-medium w-max'}>
                  {t(step.state)}
                </span>
              </div>
            </>
          ) : (
            <>
              <div aria-hidden={'true'} className={'absolute inset-0 flex items-center'}>
                <div className={'h-0.5 w-full bg-gray-200'} />
              </div>
              <div
                className={
                  'flex h-4 w-4 items-center justify-center rounded-full border-2 border-gray-300 bg-white'
                }
              />
              <div className={'absolute top-5 text-xs text-gray-600 font-medium w-max right-1/2'}>
                {t(step.state)}
              </div>
            </>
          )}
        </li>
      ))}
    </ol>
  );
};

const DraftModalContent = ({ onClose, visible, actionId }: any) => {
  const t = useTranslation();
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
            <div className={'divide-y divide-gray-300'}>
              <div className={'mb-5 space-y-5'}>
                {/*<Steps currentStatus={ActionStatus.Reviewing} />*/}
                <p className={'text-gray-600 text-sm'}>
                  {
                    'The action is currently in draft. It can be pushed for public review once ready.'
                  }
                </p>
              </div>
              <div className={'space-y-2 pt-5'}>
                <p className={'text-gray-600 font-medium'}>{'When the action is up for review'}</p>
                <ul className={'[&>li]:text-gray-600 [&>li]:text-sm list-disc list-inside '}>
                  <li>{'It will be publicly available in search and feeds.'}</li>
                  <li>{'It can be edited anytime to accommodate feedback.'}</li>
                  <li>{'If the action is not viable, it can be deleted at anytime.'}</li>
                  <li>{'It cannot be moved back to draft.'}</li>
                  <li>{'People cannot fund it yet.'}</li>
                </ul>
              </div>
            </div>
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

const InReviewModalContent = ({ onClose, visible, actionId }: any) => {
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
            <div className={'divide-y divide-gray-300'}>
              <p className={'text-gray-600 text-sm mb-5'}>
                {
                  'The action is currently in public review. It can be published to kickstart the work and funding.'
                }
              </p>
              <div className={'space-y-2 pt-5'}>
                <p className={'text-gray-600 font-medium'}>{'When the action is published'}</p>
                <ul className={'[&>li]:text-gray-600 [&>li]:text-sm list-disc list-inside'}>
                  <li>{'It cannot be edited or deleted.'}</li>
                  <li>{'It cannot be moved back to review.'}</li>
                  <li>{'Work on the action can start.'}</li>
                  <li>{'The community can start funding it.'}</li>
                </ul>
              </div>
            </div>
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

const ActionStatusModal_ = suspensify(({ actionId }: { actionId: string }) => {
  const status = useValue('action/status', { 'action/id': actionId });
  const onClose = useDispatch('action.status.modal/close');
  const Component = modalMapping[status];
  return <Component actionId={actionId} visible={true} onClose={onClose} />;
});

export const ActionStatusModal = suspensify(() => {
  const { visible, 'action/id': actionId } = useValue('action.status/modal');
  return visible ? <ActionStatusModal_ actionId={actionId} /> : null;
});

export const ActionStatusButton = suspensify(({ actionId }: { actionId: string }) => {
  const t = useTranslation();
  const status = useValue('action/status', { 'action/id': actionId });
  const color = colorMapping[status];

  const openActionModal = useDispatch('action.status.modal/open');

  const onClick = useCallback(() => {
    openActionModal({ 'action/id': actionId });
  }, [openActionModal, actionId]);

  return <StatusButton color={color} name={t(status)} onClick={onClick} />;
});
