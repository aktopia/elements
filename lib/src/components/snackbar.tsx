import {
  CheckCircleMiniSolid,
  ExclamationTriangleMiniSolid,
  InformationCircleMiniSolid,
  XCircleMiniSolid,
  XMarkMiniSolid,
} from '@elements/icons';
import { cva } from 'cva';
import type { MouseEvent } from 'react';
import type { Kind } from '@elements/logic/alert';

const containerVariant = cva(
  'fixed bottom-10 w-11/12 rounded-lg p-4 -translate-x-1/2 left-1/2 transform transition-all ease-out z-40 shadow-xl',
  {
    variants: {
      kind: {
        success: 'bg-green-600',
        info: 'bg-blue-600',
        warning: 'bg-amber-600',
        error: 'bg-red-600',
      },
    },
  }
);

const icon = {
  success: CheckCircleMiniSolid,
  info: InformationCircleMiniSolid,
  warning: ExclamationTriangleMiniSolid,
  error: XCircleMiniSolid,
};

const Icon = ({ kind }: { kind: Kind }) => {
  const Component = icon[kind || 'info'];
  return <Component aria-hidden={'true'} className={'h-6 w-6 text-white'} />;
};

export interface AlertProps {
  message: string;
  visible: boolean;
  onDismiss: (event: MouseEvent) => void;
  kind: Kind;
}

export const Snackbar = ({ message, visible, kind, onDismiss }: AlertProps) => {
  return visible ? (
    <div className={containerVariant({ kind })}>
      <div className={'flex items-center'}>
        <div className={'flex-shrink-0'}>
          <Icon aria-hidden={'true'} kind={kind} />
        </div>
        <div className={'ml-6'}>
          <p className={'text-sm text-white'}>{message}</p>
        </div>
        <div className={'ml-auto pl-3'}>
          <div className={'-m-1.5'}>
            <button
              className={'flex items-center justify-center text-white transition-all ease-out'}
              type={'button'}
              onClick={onDismiss}>
              <XMarkMiniSolid aria-hidden={'true'} className={'h-7 w-7'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

/*
Proper width
Animation on hide and visible
stack on top of each other when there are many
 */
