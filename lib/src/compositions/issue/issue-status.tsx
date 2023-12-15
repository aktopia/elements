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

const DraftModalContent = ({ onClose, visible, issueId }: any) => {
  const canUpdateStatus = useValue('issue.status/can-update', {
    'issue/id': issueId,
    status: IssueStatusEnum.Open,
  });

  const updateStatus = useDispatch('issue.status/update');
  const onPushToOpen = useCallback(() => {
    updateStatus({ 'issue/id': issueId, status: IssueStatusEnum.Open });
  }, [updateStatus, issueId]);

  const modalTitle = 'Issue Status';
  const draftDescription = 'The issue is currently in draft.';
  const pushToOpenButtonLabel = 'Push to Open';

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
        value={pushToOpenButtonLabel}
        onClick={onPushToOpen}
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

const OpenModalContent = ({ onClose, visible }: any) => {
  // TODO i18n
  const modalTitle = 'Issue Status';
  const activeDescription =
    'The issue is currently open.';

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

const ResolvedModalContent = ({ onClose, visible }: any) => {
  // TODO i18n
  const modalTitle = 'Issue Status';
  const activeDescription =
    'The issue is resolved.';

  return (
    <Modal visible={visible} onClose={onClose}>
      <ModalPanel>
        <div className={'flex flex-col gap-6 p-6 w-full md:w-[500px]'}>
          <ModalHeader title={modalTitle} onClose={onClose} />
          <div className={'space-y-5'}>
            <div className={'flex justify-center'}>
              <div className={'w-4/5 mb-5'}>
                <Steps currentStatus={IssueStatusEnum.Resolved} />
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
  [IssueStatusEnum.Open]: OpenModalContent,
  [IssueStatusEnum.Resolved]: ResolvedModalContent,
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
