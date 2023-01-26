import {
  CheckCircleMiniSolid,
  ExclamationTriangleMiniSolid,
  InformationCircleMiniSolid,
  XCircleMiniSolid,
  XMarkMiniSolid,
} from '@elements/_icons';
import { cva, VariantProps } from 'cva';
import React from 'react';

const containerVariant = cva(
  'fixed bottom-10 w-11/12 rounded-lg p-4 -translate-x-1/2 left-1/2 transform transition-all ease-out z-40 shadow border',
  {
    variants: {
      type: {
        success: 'bg-green-50 border-green-300',
        info: 'bg-blue-50 border-blue-300',
        warning: 'bg-yellow-50 border-yellow-300',
        error: 'bg-red-50 border-red-300',
      },
    },
  },
);

const iconVariant = cva('h-5 w-5', {
  variants: {
    type: {
      success: 'text-green-400',
      info: 'text-blue-400',
      warning: 'text-yellow-400',
      error: 'text-red-400',
    },
  },
});

const messageVariant = cva('text-sm font-medium', {
  variants: {
    type: {
      success: 'text-green-800',
      info: 'text-blue-800',
      warning: 'text-yellow-800',
      error: 'text-red-800',
    },
  },
});

const closeButtonVariant = cva('inline-flex rounded-full p-1 transition-all ease-out', {
  variants: {
    type: {
      success: 'bg-green-50 text-green-500 hover:bg-green-100',
      info: 'bg-blue-50 text-blue-500 hover:bg-blue-100',
      warning: 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100',
      error: 'bg-red-50 text-red-500 hover:bg-red-100',
    },
  },
});

const icon = {
  success: CheckCircleMiniSolid,
  info: InformationCircleMiniSolid,
  warning: ExclamationTriangleMiniSolid,
  error: XCircleMiniSolid,
};

function Icon({ type }: VariantProps<typeof iconVariant>) {
  const Component = icon[type || 'info'];
  return <Component aria-hidden='true' className={iconVariant({ type })} />;
}

type Variant = VariantProps<typeof containerVariant>;

export interface IAlert {
  messageText: string;
  variant: Variant;
  show: boolean;
  onDismiss: (event: React.MouseEvent) => void;
}

export function Alert({
  messageText,
  show,
  variant: { type } = { type: 'info' },
  onDismiss,
}: IAlert) {
  return show ? (
    <div className={containerVariant({ type })}>
      <div className='flex items-center'>
        <div className='flex-shrink-0'>
          <Icon aria-hidden='true' type={type}  />
        </div>
        <div className='ml-3'>
          <p className={messageVariant({ type })}>{messageText}</p>
        </div>
        <div className='ml-auto pl-3'>
          <div className='-mx-1.5 -my-1.5'>
            <button className={closeButtonVariant({ type })} type='button' onClick={onDismiss}>
              <span className='sr-only'>Dismiss</span>
              <XMarkMiniSolid aria-hidden='true' className='h-5 w-5' />
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

/*
Proper width
Animation on hide and show
 */
