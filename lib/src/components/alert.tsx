import { CheckCircleMiniSolid, XMarkMiniSolid } from '@elements/_icons';
import { cva, VariantProps } from 'cva';

const containerVariant = cva('rounded-lg p-4', {
  variants: {
    type: {
      success: 'bg-green-50',
      info: 'bg-blue-50',
      warning: 'bg-yellow-50',
      error: 'bg-red-50',
    },
  },
});

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

const closeButtonVariant = cva('inline-flex rounded-full p-1', {
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
  success: <XMarkMiniSolid className="h-5 w-5" aria-hidden="true" />,
  info: <XMarkMiniSolid className="h-5 w-5" aria-hidden="true" />,
  warning: <XMarkMiniSolid className="h-5 w-5" aria-hidden="true" />,
  error: <XMarkMiniSolid className="h-5 w-5" aria-hidden="true" />,
};

type Variant = VariantProps<typeof containerVariant>;

interface IAlert {
  messageText: string;
  variant: Variant;
}

export function Alert({ messageText, variant: { type } }: IAlert) {
  return (
    <div className={containerVariant({ type })}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <CheckCircleMiniSolid className={iconVariant({ type })} aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className={messageVariant({ type })}>{messageText}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button type="button" className={closeButtonVariant({ type })}>
              <span className="sr-only">Dismiss</span>
              {icon[type || 'info']}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
