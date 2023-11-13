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
    ([steps, currentReached], state) => {
      if (state === currentStatus) {
        return [[...steps, { state, status: 'current' }], true];
      }

      if (currentReached) {
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
  const updateStatus = useDispatch('action.status/update');
  const onPushForReview = useCallback(() => {
    updateStatus({ 'action/id': actionId, status: ActionStatusEnum.Reviewing });
  }, [updateStatus, actionId]);

  // TODO i18n
  const modalTitle = 'Action Status - Draft';
  const draftDescription =
    'The action is currently in draft. It can be pushed for public review once ready.';
  const reviewHeading = 'When the action is up for review';
  const reviewPoint1 = 'It will be publicly available in search and feeds.';
  const reviewPoint2 = 'It can be edited anytime to accommodate feedback.';
  const reviewPoint3 = 'If the action is not viable, it can be deleted at any time.';
  const reviewPoint4 = 'It cannot be moved back to draft.';
  const reviewPoint5 = 'People cannot fund it yet.';
  const pushForReviewButtonLabel = 'Push for Review';

  return (
    <Modal visible={visible} onClose={onClose}>
      <ModalPanel>
        <div className={'flex flex-col gap-6 p-6 w-full md:w-[500px]'}>
          <ModalHeader title={modalTitle} onClose={onClose} />
          <div>
            <div className={'divide-y divide-gray-300'}>
              <div className={'mb-5 space-y-5'}>
                {/*<Steps currentStatus={ActionStatus.Reviewing} />*/}
                <p className={'text-gray-600 text-sm'}>{draftDescription}</p>
              </div>
              <div className={'space-y-2 pt-5'}>
                <p className={'text-gray-600 font-medium'}>{reviewHeading}</p>
                <ul className={'[&>li]:text-gray-600 [&>li]:text-sm list-disc list-inside '}>
                  <li>{reviewPoint1}</li>
                  <li>{reviewPoint2}</li>
                  <li>{reviewPoint3}</li>
                  <li>{reviewPoint4}</li>
                  <li>{reviewPoint5}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={'flex justify-center mt-3'}>
            <Button
              kind={'primary'}
              size={'sm'}
              value={pushForReviewButtonLabel}
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

  // TODO i18n
  const modalTitle = 'Action Status - In Review';
  const inReviewDescription =
    'The action is currently in public review. It can be published to kickstart the work and funding.';
  const publishHeading = 'When the action is published';
  const publishPoint1 = 'It cannot be edited or deleted.';
  const publishPoint2 = 'It cannot be moved back to review.';
  const publishPoint3 = 'Work on the action can start.';
  const publishPoint4 = 'The community can start funding it.';
  const publishButtonLabel = 'Publish';

  return (
    <Modal visible={visible} onClose={onClose}>
      <ModalPanel>
        <div className={'flex flex-col gap-6 p-6 w-full md:w-[500px]'}>
          <ModalHeader title={modalTitle} onClose={onClose} />
          <div>
            <div className={'divide-y divide-gray-300'}>
              <p className={'text-gray-600 text-sm mb-5'}>{inReviewDescription}</p>
              <div className={'space-y-2 pt-5'}>
                <p className={'text-gray-600 font-medium'}>{publishHeading}</p>
                <ul className={'[&>li]:text-gray-600 [&>li]:text-sm list-disc list-inside'}>
                  <li>{publishPoint1}</li>
                  <li>{publishPoint2}</li>
                  <li>{publishPoint3}</li>
                  <li>{publishPoint4}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={'flex justify-center mt-3'}>
            <Button kind={'success'} size={'md'} value={publishButtonLabel} onClick={onPublish} />
          </div>
        </div>
      </ModalPanel>
    </Modal>
  );
};

const ActiveModalContent = ({ onClose, visible }: any) => {
  // TODO i18n
  const modalTitle = 'Action Status - Active';
  const activeDescription =
    'The action is being actively worked on. The community can support by volunteering or funding.';

  return (
    <Modal visible={visible} onClose={onClose}>
      <ModalPanel>
        <div className={'flex flex-col gap-6 p-6 w-full md:w-[500px]'}>
          <ModalHeader title={modalTitle} onClose={onClose} />
          <p className={'text-gray-600 text-sm'}>{activeDescription}</p>
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
