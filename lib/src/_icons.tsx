export const XMark = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      fill={'none'}
      stroke={'currentColor'}
      strokeWidth={'1.5'}
      viewBox={'0 0 24 24'}>
      <path d={'M6 18L18 6M6 6l12 12'} strokeLinecap={'round'} strokeLinejoin={'round'} />
    </svg>
  );
};

export const ChevronLeft = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      fill={'none'}
      stroke={'currentColor'}
      strokeWidth={1.5}
      viewBox={'0 0 24 24'}>
      <path d={'M15.75 19.5L8.25 12l7.5-7.5'} strokeLinecap={'round'} strokeLinejoin={'round'} />
    </svg>
  );
};

export const ChevronLeftMini = ({ className }: { className: string }) => {
  return (
    <svg className={className} fill={'currentColor'} viewBox={'0 0 20 20'}>
      <path
        clipRule={'evenodd'}
        d={
          'M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z'
        }
        fillRule={'evenodd'}
      />
    </svg>
  );
};

export const Giving = ({ className }: { className: string }) => {
  return (
    <svg className={`${className} relative bottom-0.5`} fill={'none'} viewBox={'0 0 20 20'}>
      <path
        d={
          'M7.25 12.75h-2.5v6.5h2.5v-6.5ZM7.5 14l2.512-1.615a4 4 0 0 1 2.163-.635h1.075V14l-2.5 1.25'
        }
        stroke={'currentColor'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        strokeWidth={'1.5'}
      />
      <path
        d={'M7 19c6.5 0 12.25-4.25 12.25-4.25V13H13.5'}
        stroke={'currentColor'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        strokeWidth={'1.5'}
      />
      <path
        clipRule={'evenodd'}
        d={
          'M14.153 5.19a1.296 1.296 0 0 1 1.944 0l.403.439.403-.44a1.296 1.296 0 0 1 1.944 0 1.598 1.598 0 0 1 0 2.122l-1.375 1.5a1.296 1.296 0 0 1-1.944 0l-1.375-1.5a1.598 1.598 0 0 1 0-2.122Z'
        }
        stroke={'currentColor'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        strokeWidth={'1.5'}
      />
    </svg>
  );
};

export {
  CheckCircleIcon as CheckCircleMiniSolid,
  XMarkIcon as XMarkMiniSolid,
  XCircleIcon as XCircleMiniSolid,
  ExclamationTriangleIcon as ExclamationTriangleMiniSolid,
  InformationCircleIcon as InformationCircleMiniSolid,
  RssIcon as RssMiniSolid,
  PlusIcon as PlusMiniSolid,
  TrophyIcon as TrophyMiniSolid,
  ChevronDownIcon as ChevronDownMiniSolid,
  ChevronUpIcon as ChevronUpMiniSolid,
} from '@heroicons/react/20/solid';

export {
  XMarkIcon as XMarkSolid,
  CheckCircleIcon as CheckCircleSolid,
  UserCircleIcon as UserCircleSolid,
} from '@heroicons/react/24/solid';

export { BoltIcon as BoltOutline } from '@heroicons/react/24/outline';

/*
TODO Rename existing icons

 */
