import { XMark } from '@elements/_icons';
import { Dialog, Transition } from '@headlessui/react';
import { identity } from 'lodash';
import React, { Fragment } from 'react';

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
  visible: boolean;
}

const Close = ({ onClose }: any) => {
  return onClose ? (
    <div
      className={
        'cursor-pointer p-1 text-gray-500 transition-all ease-out hover:rounded-full hover:bg-gray-100 hover:text-gray-700'
      }
      onClick={onClose}>
      <XMark className={'h-4 w-4'} />
    </div>
  ) : null;
};

const Title = ({ title }: any) => {
  return title ? (
    <Dialog.Title className={'text-lg font-medium leading-6 text-gray-900'}>{title}</Dialog.Title>
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
export const Modal = ({ children, onClose, visible }: ModalProps) => {
  return (
    <Transition.Root appear afterLeave={console.log} as={Fragment} show={visible}>
      <Dialog className={'relative z-30'} open={visible} onClose={onClose || identity}>
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

        <div className={'fixed inset-0 overflow-y-auto p-4 sm:p-6 md:p-20'}>
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
                'mx-auto flex w-full max-w-md scale-100 transform overflow-hidden rounded-2xl bg-white p-6 opacity-100 shadow-xl ring-1 ring-black ring-opacity-5 transition-all'
              }>
              {children}
            </Dialog.Panel>
          </Transition.Child>
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
