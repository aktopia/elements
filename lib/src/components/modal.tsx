import { XMark } from '@elements/icons';
import { Dialog } from '@headlessui/react';
import type { ReactNode } from 'react';
import { useCallback } from 'react';

interface ModalProps {
  children: ReactNode;
  onClose?: (..._: any) => void;
  visible: boolean;
  closeDisabled?: boolean;
}

export const ModalTitle = Dialog.Title;

const Close = ({ onClose }: any) => {
  return onClose ? (
    <div
      className={
        'cursor-pointer p-1 text-gray-500 transition-all ease-out hover:rounded-full hover:bg-gray-100 hover:text-gray-700'
      }
      onClick={onClose}>
      <XMark className={'h-5 w-5'} />
    </div>
  ) : null;
};

const Title = ({ title }: any) => {
  return title ? (
    <ModalTitle className={'text-lg font-medium leading-6 text-gray-900'}>{title}</ModalTitle>
  ) : null;
};

export const ModalHeader = ({ title, onClose }: any) => {
  return (
    <div className={'flex items-center justify-between'}>
      <Title title={title} />
      <Close onClose={onClose} />
    </div>
  );
};

export const ModalPanel = ({ children }: { children: ReactNode }) => {
  return (
    <Dialog.Panel className={'rounded-2xl border border-gray-300 bg-white shadow-xl'}>
      {children}
    </Dialog.Panel>
  );
};

export const Modal = ({ children, onClose, visible, closeDisabled = false }: ModalProps) => {
  const onDialogClose = useCallback(() => {
    if (onClose && !closeDisabled) {
      onClose();
    }
  }, [onClose, closeDisabled]);

  // not sending open as visible because it renders and empty div if visible is false
  return visible ? (
    <Dialog className={'z-modal relative'} open={true} onClose={onDialogClose}>
      <div
        className={
          'fixed inset-0 flex items-start justify-center overflow-y-auto p-4 sm:p-6 md:p-20'
        }>
        {children}
      </div>
    </Dialog>
  ) : null;
};

/*
TODO
mobile
outside click handler
types
generic modal without title and close
 */
