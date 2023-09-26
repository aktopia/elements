import { CheckSolid, ExclamationTriangleOutline } from '@elements/icons';
import { Button, Kind } from '@elements/components/button';
import { Modal, ModalPanel, ModalTitle } from '@elements/components/modal';
import { memo } from 'react';

const IconBadge = ({ kind }: { kind: any }) => {
  let component;
  switch (kind) {
    case 'danger':
      component = (
        <div
          className={'mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100'}>
          <ExclamationTriangleOutline aria-hidden={'true'} className={'h-6 w-6 text-red-600'} />
        </div>
      );
      break;
    default:
      component = (
        <div
          className={
            'mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100'
          }>
          <CheckSolid aria-hidden={'true'} className={'h-6 w-6 text-green-600'} />
        </div>
      );
      break;
  }
  return component;
};

export interface ConfirmationModalProps {
  titleText: string;
  bodyText: string;
  visible: boolean;
  onClose: () => void;
  confirmText: string;
  onConfirm: () => void;
  kind: Kind;
  cancelText?: string;
}

export const ConfirmationModal = memo(
  ({
    titleText,
    bodyText,
    visible,
    onClose,
    confirmText,
    onConfirm,
    kind,
    cancelText,
  }: ConfirmationModalProps) => {
    return (
      <Modal visible={visible} onClose={onClose}>
        <ModalPanel>
          <div className={'flex w-full flex-col items-center justify-center gap-6 p-6'}>
            <div>
              <IconBadge kind={kind} />
              <div className={'mt-3 text-center sm:mt-5'}>
                <ModalTitle className={'text-base font-semibold leading-6 text-gray-900'}>
                  {titleText}
                </ModalTitle>
                <div className={'mt-2'}>
                  <p className={'text-sm text-gray-500'}>{bodyText}</p>
                </div>
              </div>
            </div>
            <div className={'flex gap-6'}>
              {cancelText ? (
                <Button kind={'tertiary'} size={'sm'} value={cancelText} onClick={onClose} />
              ) : null}
              <Button kind={kind} size={'sm'} value={confirmText} onClick={onConfirm} />
            </div>
          </div>
        </ModalPanel>
      </Modal>
    );
  }
);
