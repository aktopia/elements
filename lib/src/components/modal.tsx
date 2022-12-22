import React from 'react';
import { XMark } from '@elements/_icons';

export const Modal = ({ title, children, onClose, show }: any) => {
  return (
    show && (
      <div className="fixed left-1/2 top-1/3 flex w-max -translate-x-1/2 -translate-y-1/2 transform flex-col gap-5 rounded-lg border border-gray-100 bg-white px-5 pt-4 pb-5 shadow-md transition-all ease-out">
        <div className="flex items-center justify-between self-stretch">
          <div className="text-left text-lg font-medium tracking-wide text-gray-900">{title}</div>
          {onClose && (
            <div
              onClick={onClose}
              className={
                'cursor-pointer p-1 text-gray-500 transition-all ease-out hover:rounded hover:rounded-full hover:bg-gray-100 hover:text-gray-700'
              }>
              <XMark className={'h-4 w-4'} />
            </div>
          )}
        </div>
        <div>{children}</div>
      </div>
    )
  );
};

/*
TODO
z index
types
generic modal without title and close
mobile
outside click handler

 */
