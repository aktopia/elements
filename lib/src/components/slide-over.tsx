import type { ReactNode } from 'react';
import { memo } from 'react';
import { Button } from '@elements/components/button';

export const SlideOverTitle = memo(({ title }: { title: string }) => {
  return <h1 className={'font-medium leading-6 text-gray-600'}>{title}</h1>;
});

export const SlideOverHeader = memo(({ children }: { children: ReactNode }) => {
  return (
    <div className={'px-4 py-4 sm:px-6'}>
      <div className={'flex items-center justify-between'}>{children}</div>
    </div>
  );
});

export const SlideOverBody = memo(({ children }: { children: ReactNode }) => {
  return <div className={'relative mt-5 mb-10 flex-1 px-4 sm:px-6'}>{children}</div>;
});

export const SlideOverCloseButton = memo(({ onClick }: { onClick: () => void }) => {
  return (
    <div className={'ml-3 flex h-7 items-center'}>
      <button
        className={'rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none'}
        type={'button'}
        onClick={onClick}>
        <svg
          aria-hidden={'true'}
          className={'h-6 w-6'}
          fill={'none'}
          stroke={'currentColor'}
          strokeWidth={'1.5'}
          viewBox={'0 0 24 24'}>
          <path d={'M6 18L18 6M6 6l12 12'} strokeLinecap={'round'} strokeLinejoin={'round'} />
        </svg>
      </button>
    </div>
  );
});

export const SlideOverFooter = ({ onCancel, onAction, actionText, cancelText }: any) => {
  return (
    <div className={'flex justify-end gap-5 border-t border-t-gray-300 bg-white px-6 py-6'}>
      {onCancel && <Button kind={'tertiary'} size={'sm'} value={cancelText} onClick={onCancel} />}
      <Button kind={'success'} size={'sm'} value={actionText} onClick={onAction} />
    </div>
  );
};

export const SlideOver = ({
  children,
  visible,
}: {
  children: ReactNode;
  visible: boolean;
  onClose: () => void;
}) => {
  return visible ? (
    <div>
      <div aria-hidden={'true'} className={'z-overlay fixed inset-0 bg-black/20'} />
      <div
        className={
          'z-slideover fixed right-0 top-0 h-screen w-max overflow-y-scroll border-l border-l-gray-300 bg-white shadow-2xl'
        }>
        {children}
      </div>
    </div>
  ) : null;
};

/*
TODO
- Accessibility
 */
