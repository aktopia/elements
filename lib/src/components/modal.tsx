import { XMark } from '@elements/icons';
import * as Dialog from '@radix-ui/react-dialog';
import type { ReactNode } from 'react';
import { useCallback } from 'react';

interface ModalProps {
  children: ReactNode;
  onClose: (..._: any) => void;
  visible: boolean;
}

export const ModalTitle = Dialog.Title;

const Close = ({ onClose }: any) => {
  return onClose ? (
    <Dialog.Close
      className={
        'cursor-pointer p-1 text-gray-500 transition-all ease-out hover:rounded-full hover:bg-gray-100 hover:text-gray-700'
      }
      onClick={onClose}>
      <XMark className={'h-4 w-4'} />
    </Dialog.Close>
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
    <div
      className={
        'w-max scale-100 transform overflow-hidden rounded-2xl border border-gray-200 bg-white opacity-100 shadow-xl transition-all'
      }>
      {children}
    </div>
  );
};

export const Modal = ({ children, onClose, visible }: ModalProps) => {
  const onOpenChange = useCallback(
    (open: boolean) => {
      !open && onClose();
    },
    [onClose]
  );

  return (
    <Dialog.Root open={visible} onOpenChange={onOpenChange}>
      <Dialog.Overlay />
      <Dialog.Portal>
        <Dialog.Content
          className={
            'fixed inset-0 flex items-start justify-center overflow-y-auto p-4 sm:p-6 md:p-20'
          }>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

/*
TODO
mobile
outside click handler
types
generic modal without title and close
 */
