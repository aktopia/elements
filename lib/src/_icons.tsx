import React from 'react';

export const XMark = ({ className }: { className: string }) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
};

export const ChevronLeft = ({ className }: { className: string }) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  );
};

export const ChevronLeftMini = ({ className }: { className: string }) => {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export {
  CheckCircleIcon as CheckCircleMiniSolid,
  XMarkIcon as XMarkMiniSolid,
} from '@heroicons/react/20/solid';

export {
  XMarkIcon as XMarkSolid,
  CheckCircleIcon as CheckCircleSolid,
} from '@heroicons/react/24/solid';

/*
TODO Rename existing icons

 */
