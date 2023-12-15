import { IssueStatus as IssueStatusEnum } from '@elements/logic/issue';
import { suspensify } from '@elements/components/suspensify';
import { useTranslation } from '@elements/translation';
import { useDispatch, useValue } from '@elements/store/interface';
import type { Colors } from '@elements/components/status-button';
import { StatusButton } from '@elements/components/status-button';
import { Modal, ModalHeader, ModalPanel } from '@elements/components/modal';
import { Button } from '@elements/components/button';
import { useCallback } from 'react';
import { ArrowRightSolid } from '@elements/icons';

const colorMapping: Record<IssueStatusEnum, Colors> = {
  [IssueStatusEnum.Draft]: 'gray',
  [IssueStatusEnum.Open]: 'green',
  [IssueStatusEnum.Resolved]: 'blue',
};

const states = [
  IssueStatusEnum.Draft,
  IssueStatusEnum.Open,
  IssueStatusEnum.Resolved,
];

type StepStatus = 'complete' | 'current' | 'inactive';

interface Step {
  state: IssueStatusEnum;
  status: StepStatus;
}

export const Steps = ({ currentStatus }: { currentStatus: IssueStatusEnum }) => {
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


  const StepsUI = (
    <div className={'flex justify-center mb-7'}>
      <div className={'w-4/5'}>
        <Steps currentStatus={IssueStatusEnum.Draft} />
      </div>
    </div>
  );


const InReviewModalContent = ({ onClose, visible, issueId }: any) => {
  const canUpdateStatus = useValue('issue.status/can-update', {
    'issue/id': issueId,
    status: IssueStatusEnum.Open,
  });

  const updateStatus = useDispatch('issue.status/update');
  const onPublish = useCallback(() => {
    updateStatus({ 'issue/id': issueId, status: IssueStatusEnum.Open });
  }, [updateStatus, issueId]);

  // TODO i18n
  const modalTitle = 'Issue Status';
  const inReviewDescription = canUpdateStatus
    ? 'The issue is currently in public review. If you think it has been refined enough, you can publish it to kickstart work and funding.'
    : 'Your thoughts are critical. Discuss the issue with the team and community to refine it.';
  const publishButtonLabel = 'Publish';

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

const DraftModalContent = ({ onClose, visible, issueId }: any) => {
  const canUpdateStatus = useValue('issue.status/can-update', {
    'issue/id': issueId,
    status: IssueStatusEnum.Open,
  });

  const updateStatus = useDispatch('issue.status/update');
  const onPushForReview = useCallback(() => {
    updateStatus({ 'issue/id': issueId, status: IssueStatusEnum.Open });
  }, [updateStatus, issueId]);

  const modalTitle = 'Issue Status';
  const draftDescription = canUpdateStatus
    ? 'The issue is currently in draft and is not publicly listed. It can be open once ready.'
    : 'This issue is currently in draft and is not publicly listed.';
  const pushForReviewButtonLabel = 'Push for Review';

  const StepsUI = (
    <div className={'flex justify-center mb-7'}>
      <div className={'w-4/5'}>
        <Steps currentStatus={IssueStatusEnum.Draft} />
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

const ActiveModalContent = ({ onClose, visible }: any) => {
  // TODO i18n
  const modalTitle = 'Issue Status';
  const activeDescription =
    'The issue is being actively worked on. The community can support by volunteering or funding.';

  return (
    <Modal visible={visible} onClose={onClose}>
      <ModalPanel>
        <div className={'flex flex-col gap-6 p-6 w-full md:w-[500px]'}>
          <ModalHeader title={modalTitle} onClose={onClose} />
          <div className={'space-y-5'}>
            <div className={'flex justify-center'}>
              <div className={'w-4/5 mb-5'}>
                <Steps currentStatus={IssueStatusEnum.Open} />
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
  [IssueStatusEnum.Draft]: DraftModalContent,
  [IssueStatusEnum.Open]: ActiveModalContent,
  [IssueStatusEnum.Resolved]: InReviewModalContent,
};

const IssueStatusModal_ = suspensify(({ issueId }: { issueId: string }) => {
  const status = useValue('issue/status', { 'issue/id': issueId });
  const onClose = useDispatch('issue.status.modal/close');
  const Component = modalMapping[status];
  return <Component issueId={issueId} visible={true} onClose={onClose} />;
});

export const IssueStatusModal = suspensify(() => {
  const { visible, 'issue/id': issueId } = useValue('issue.status/modal');
  return visible ? <IssueStatusModal_ issueId={issueId} /> : null;
});

export const IssueStatusButton = suspensify(({ issueId }: { issueId: string }) => {
  const t = useTranslation();
  const status = useValue('issue/status', { 'issue/id': issueId });
  const color = colorMapping[status];

  const openIssueModal = useDispatch('issue.status.modal/open');

  const onClick = useCallback(() => {
    openIssueModal({ 'issue/id': issueId });
  }, [openIssueModal, issueId]);

  return <StatusButton color={color} name={t(status)} onClick={onClick} />;
});
