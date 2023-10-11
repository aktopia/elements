import { XMark } from '@elements/icons';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useMemo } from 'react';
import type { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  onClose?: (..._: any) => void;
  visible: boolean;
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
    <Transition.Child
      as={Fragment}
      enter={'ease-out duration-300'}
      enterFrom={'opacity-0 scale-95'}
      enterTo={'opacity-100 scale-100'}
      leave={'ease-in duration-200'}
      leaveFrom={'opacity-100 scale-100'}
      leaveTo={'opacity-0 scale-95'}>
      <Dialog.Panel
        className={
          'w-max scale-100 transform rounded-2xl border border-gray-200 bg-white opacity-100 shadow-xl transition-all'
        }>
        {children}
      </Dialog.Panel>
    </Transition.Child>
  );
};

export const Modal = ({ children, onClose, visible }: ModalProps) => {
  const onDialogClose = useMemo(() => {
    return onClose || (() => {});
  }, [onClose]);

  return (
    <Transition.Root appear afterLeave={console.log} as={Fragment} show={visible}>
      <Dialog className={'z-modal relative'} open={visible} onClose={onDialogClose}>
        <Transition.Child
          as={Fragment}
          enter={'ease-out duration-300'}
          enterFrom={'opacity-0'}
          enterTo={'opacity-100'}
          leave={'ease-in duration-200'}
          leaveFrom={'opacity-100'}
          leaveTo={'opacity-0'}>
          <div className={'fixed inset-0 bg-opacity-25 transition-opacity'} />
        </Transition.Child>
        <div
          className={
            'fixed inset-0 flex items-start justify-center overflow-y-auto p-4 sm:p-6 md:p-20'
          }>
          {children}
        </div>
      </Dialog>
    </Transition.Root>
  );
};

/*
TODO
mobile
outside click handler
types
generic modal without title and close
 */
