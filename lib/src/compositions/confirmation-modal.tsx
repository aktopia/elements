import { suspensify } from '@elements/components/suspensify';
import { useDispatch, useValue } from '@elements/store/interface';
import { ConfirmationModal as RawConfirmationModal } from '@elements/components/confirmation-modal';
import { useCallback } from 'react';

export const ConfirmationModal = suspensify(() => {
  const { kind, confirmText, bodyText, cancelText, titleText, onConfirm } = useValue(
    'confirmation-modal/params'
  );
  const visible = useValue('confirmation-modal/visible');
  const onClose = useDispatch('confirmation-modal/close') as () => void;

  const onConfirmClick = useCallback(() => {
    onConfirm();
    onClose();
  }, [onConfirm, onClose]);

  return (
    <RawConfirmationModal
      bodyText={bodyText}
      cancelText={cancelText}
      confirmText={confirmText}
      kind={kind}
      titleText={titleText}
      visible={visible}
      onClose={onClose}
      onConfirm={onConfirmClick}
    />
  );
});
