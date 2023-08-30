import type { ReactNode } from 'react';
import { memo } from 'react';

export const SlideOverTitle = memo(({ title }: { title: string }) => {
  return <h2 className={'font-medium leading-6 text-gray-600'}>{title}</h2>;
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
        className={
          'rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        }
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

export const SlideOver = ({ children, visible }: { children: ReactNode; visible: boolean }) => {
  if (!visible) return null;

  return (
    <div
      className={
        'fixed right-0 top-0 z-50 h-screen w-full overflow-y-scroll border-l border-l-gray-200 bg-white shadow-2xl sm:w-1/3'
      }>
      {children}
    </div>
  );
};
