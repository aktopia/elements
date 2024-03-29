import { ActionStatus as ActionStatusEnum } from '@elements/logic/action';
import { suspensify } from '@elements/components/suspensify';
import { useTranslation } from '@elements/translation';
import { useDispatch, useValue } from '@elements/store/interface';
import type { Colors } from '@elements/components/status-button';
import { StatusButton } from '@elements/components/status-button';
import { Modal, ModalHeader, ModalPanel } from '@elements/components/modal';
import { Button } from '@elements/components/button';
import { useCallback } from 'react';
import { ArrowRightSolid } from '@elements/icons';

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
  const [steps, currentStatusIndex, _] = states.reduce<[Step[], number, boolean]>(
    ([steps, currentStatusIndex, currentReached], state, idx) => {
      if (state === currentStatus) {
        return [[...steps, { state, status: 'current' }], idx, true];
      }

      if (currentReached) {
        return [[...steps, { state, status: 'inactive' }], currentStatusIndex, true];
      }

      return [[...steps, { state, status: 'complete' }], currentStatusIndex, false];
    },
    [[], 0, false]
  );

  return (
    <div className={'flex items-center w-full'}>
      {steps.map((step, stepIdx) => (
        <>
          <span key={step.state} className={'relative flex flex-col items-center justify-center'}>
            {step.status === 'complete' ? (
              <>
                <span className={'h-5 w-5 rounded-full bg-blue-600'} />
                <span className={'absolute top-6 text-xs text-gray-600 font-medium w-max'}>
                  {t(step.state)}
                </span>
              </>
            ) : step.status === 'current' ? (
              <>
                <span
                  className={
                    'h-5 w-5 flex items-center justify-center rounded-full border-4 border-blue-600 bg-white'
                  }>
                  <span className={'h-2 w-2 rounded-full bg-blue-600 animate-pulse'} />
                </span>
                <span className={'absolute top-6 text-xs text-gray-600 font-medium w-max'}>
                  {t(step.state)}
                </span>
              </>
            ) : (
              <>
                <span className={'h-5 w-5 rounded-full border-4 border-gray-300 bg-white'} />
                <span className={'absolute top-6 text-xs text-gray-600 font-medium w-max'}>
                  {t(step.state)}
                </span>
              </>
            )}
          </span>
          {stepIdx < steps.length - 1 ? (
            <span className={'w-full'}>
              {stepIdx < currentStatusIndex ? (
                <div className={'h-1 bg-blue-600'} />
              ) : (
                <div className={'h-1 bg-gray-300'} />
              )}
            </span>
          ) : null}
        </>
      ))}
    </div>
  );
};

const DraftModalContent = ({ onClose, visible, actionId }: any) => {
  const canUpdateStatus = useValue('action.status/can-update', {
    'action/id': actionId,
    status: ActionStatusEnum.Reviewing,
  });

  const updateStatus = useDispatch('action.status/update');
  const onPushForReview = useCallback(() => {
    updateStatus({ 'action/id': actionId, status: ActionStatusEnum.Reviewing });
  }, [updateStatus, actionId]);

  // TODO i18n
  const modalTitle = 'Action Status';
  const draftDescription = canUpdateStatus
    ? 'The action is currently in draft and is not publicly listed. It can be pushed for public review once ready.'
    : 'This action is currently in draft and is not publicly listed.';
  // const reviewHeading = 'When the action is up for review';
  // const reviewPoint1 = 'It will be publicly available in search and feeds.';
  // const reviewPoint2 = 'It can be edited anytime to accommodate feedback.';
  // const reviewPoint3 = 'If the action is not viable, it can be deleted at any time.';
  // const reviewPoint4 = 'It cannot be moved back to draft.';
  // const reviewPoint5 = 'People cannot fund it yet.';
  const pushForReviewButtonLabel = 'Push for Review';

  const StepsUI = (
    <div className={'flex justify-center mb-7'}>
      <div className={'w-4/5'}>
        <Steps currentStatus={ActionStatusEnum.Draft} />
      </div>
    </div>
  );

  const StateDescriptionUI = <p className={'text-gray-600 text-sm'}>{draftDescription}</p>;

  const PublishButtonUI = canUpdateStatus ? (
    <div className={'flex justify-center mt-3'}>
      <Button
        SecondaryIcon={ArrowRightSolid}
        kind={'success'}
        size={'sm'}
        value={pushForReviewButtonLabel}
        onClick={onPushForReview}
      />
    </div>
  ) : null;

  return (
    <Modal visible={visible} onClose={onClose}>
      <ModalPanel>
        <div className={'flex flex-col gap-7 p-6 w-full md:w-[500px]'}>
          <ModalHeader title={modalTitle} onClose={onClose} />
          <div className={'flex-col flex gap-5'}>
            {StepsUI}
            {StateDescriptionUI}
            {PublishButtonUI}
          </div>
        </div>
      </ModalPanel>
    </Modal>
  );
};

const InReviewModalContent = ({ onClose, visible, actionId }: any) => {
  const canUpdateStatus = useValue('action.status/can-update', {
    'action/id': actionId,
    status: ActionStatusEnum.Active,
  });

  const updateStatus = useDispatch('action.status/update');
  const onPublish = useCallback(() => {
    updateStatus({ 'action/id': actionId, status: ActionStatusEnum.Active });
  }, [updateStatus, actionId]);

  // TODO i18n
  const modalTitle = 'Action Status';
  const inReviewDescription = canUpdateStatus
    ? 'The action is currently in public review. If you think it has been refined enough, you can publish it to kickstart work and funding.'
    : 'Your thoughts are critical. Discuss the action with the team and community to refine it.';
  // const publishHeading = 'When the action is published';
  // const publishPoint1 = 'It cannot be edited or deleted.';
  // const publishPoint2 = 'It cannot be moved back to review.';
  // const publishPoint3 = 'Work on the action can start.';
  // const publishPoint4 = 'The community can start funding it.';
  const publishButtonLabel = 'Publish';

  const StepsUI = (
    <div className={'flex justify-center mb-7'}>
      <div className={'w-4/5'}>
        <Steps currentStatus={ActionStatusEnum.Reviewing} />
      </div>
    </div>
  );

  const StateDescriptionUI = <p className={'text-gray-600 text-sm'}>{inReviewDescription}</p>;

  const PublishButtonUI = canUpdateStatus ? (
    <div className={'flex justify-center mt-3'}>
      <Button
        SecondaryIcon={ArrowRightSolid}
        kind={'success'}
        size={'sm'}
        value={publishButtonLabel}
        onClick={onPublish}
      />
    </div>
  ) : null;

  return (
    <Modal visible={visible} onClose={onClose}>
      <ModalPanel>
        <div className={'flex flex-col gap-7 p-6 w-full md:w-[500px]'}>
          <ModalHeader title={modalTitle} onClose={onClose} />
          <div className={'flex-col flex gap-5'}>
            {StepsUI}
            {StateDescriptionUI}
            {PublishButtonUI}
          </div>
        </div>
      </ModalPanel>
    </Modal>
  );
};

const ActiveModalContent = ({ onClose, visible }: any) => {
  // TODO i18n
  const modalTitle = 'Action Status';
  const activeDescription =
    'The action is being actively worked on. The community can support by volunteering or funding.';

  return (
    <Modal visible={visible} onClose={onClose}>
      <ModalPanel>
        <div className={'flex flex-col gap-6 p-6 w-full md:w-[500px]'}>
          <ModalHeader title={modalTitle} onClose={onClose} />
          <div className={'space-y-5'}>
            <div className={'flex justify-center'}>
              <div className={'w-4/5 mb-5'}>
                <Steps currentStatus={ActionStatusEnum.Active} />
              </div>
            </div>
            <p className={'text-gray-600 text-sm'}>{activeDescription}</p>
          </div>
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
