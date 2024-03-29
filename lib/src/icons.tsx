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

export const Crowd = ({ className }: { className: string }) => {
  return (
    <svg className={`${className} relative bottom-0.5`} fill={'none'} viewBox={'0 0 20 20'}>
      <circle
        cx={'7'}
        cy={'14'}
        r={'1.3'}
        stroke={'currentColor'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        strokeWidth={'1.5'}
      />
      <circle
        cx={'12'}
        cy={'14'}
        r={'1.3'}
        stroke={'currentColor'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        strokeWidth={'1.5'}
      />
      <circle
        cx={'9'}
        cy={'10'}
        r={'1.3'}
        stroke={'currentColor'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        strokeWidth={'1.5'}
      />
      <circle
        cx={'15'}
        cy={'10'}
        r={'1.3'}
        stroke={'currentColor'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        strokeWidth={'1.5'}
      />
      <circle
        cx={'12'}
        cy={'6'}
        r={'1.3'}
        stroke={'currentColor'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        strokeWidth={'1.5'}
      />
      <circle
        cx={'17'}
        cy={'14'}
        r={'1.3'}
        stroke={'currentColor'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        strokeWidth={'1.5'}
      />
      <path
        d={
          'M9.5 19.3s-.2-2.6-2.5-2.6-2.3 2.6-2.3 2.6M14.5 19.3s-.3-2.6-2.5-2.6c-2.3 0-2.5 2.6-2.5 2.6M19.3 19.3s0-2.6-2.3-2.6-2.5 2.6-2.5 2.6'
        }
        stroke={'currentColor'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        strokeWidth={'1.5'}
      />
    </svg>
  );
};

export const CaratUpSolid = ({ className }: { className: string }) => {
  return (
    <svg className={`${className} relative bottom-0.5`} fill={'currentColor'} viewBox={'0 0 24 24'}>
      <path
        d={'M12 9.75L16.25 15.25H7.75L12 9.75Z'}
        stroke={'currentColor'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        strokeWidth={'1.5'}
      />
    </svg>
  );
};

export const CaratUp = ({ className }: { className: string }) => {
  return (
    <svg className={`${className} relative bottom-0.5`} fill={'none'} viewBox={'0 0 20 20'}>
      <path
        d={'M12 9.75L16.25 15.25H7.75L12 9.75Z'}
        stroke={'currentColor'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        strokeWidth={'1.5'}
      />
    </svg>
  );
};

export const LocationArrow = ({ className }: { className: string }) => {
  return (
    <svg className={className} fill={'none'} viewBox={'0 0 24 24'}>
      <path
        d={'m10 14 2.8 5.3 6.4-14.6-14.4 7L10 14Z'}
        stroke={'currentColor'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        strokeWidth={'1.5'}
      />
    </svg>
  );
};

export const LocationArrowSolid = ({ className }: { className: string }) => {
  return (
    <svg className={className} fill={'currentColor'} viewBox={'0 0 24 24'}>
      <path
        d={'m10 14 2.8 5.3 6.4-14.6-14.4 7L10 14Z'}
        stroke={'currentColor'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        strokeWidth={'1.5'}
      />
    </svg>
  );
};

export const Crosshair = ({ className }: { className: string }) => {
  return (
    <svg className={`${className} relative bottom-0.5`} fill={'none'} viewBox={'0 0 20 20'}>
      <path
        d={
          'M18.3 12a6.2 6.2 0 1 1-12.5 0 6.2 6.2 0 0 1 12.4 0ZM12 4.8v4.5M19.3 12h-4.6M12 14.8v4.4M9.3 12H4.7'
        }
        stroke={'currentColor'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        strokeWidth={'1.5'}
      />
    </svg>
  );
};

export const Wheel = ({ className }: { className: string }) => {
  return (
    <svg className={`${className}`} fill={'none'} viewBox={'0 0 24 24'}>
      <path
        d={'M19.25 12a7.25 7.25 0 1 1-14.5 0 7.25 7.25 0 0 1 14.5 0Z'}
        stroke={'currentColor'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        strokeWidth={'1.5'}
      />
      <path
        d={
          'M14.25 12a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0ZM5 12h4.5M19 12h-4.5M11 10 8 6M11 14l-3 4M13 10l3-4M13 14l3 4'
        }
        stroke={'currentColor'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        strokeWidth={'1.5'}
      />
    </svg>
  );
};

export const PinOnMap = ({ className }: { className: string }) => {
  return (
    <svg className={`${className} relative bottom-0.5`} fill={'none'} viewBox={'0 0 20 20'}>
      <path
        d={'M12.5 9a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z'}
        stroke={'currentColor'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
      <path
        d={
          'm5.75 13.75-.786 4.321a1 1 0 0 0 .984 1.179h12.104a1 1 0 0 0 .984-1.179l-.786-4.321m-2-4.8c0 3.05-4.25 6.3-4.25 6.3S7.75 12 7.75 8.95c0-2.32 1.903-4.2 4.25-4.2s4.25 1.88 4.25 4.2Z'
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
  MapPinIcon as MapPinMiniSolid,
  ArrowUpIcon as ArrowUpMiniSolid,
  BookmarkIcon as BookmarkMiniSolid,
  ChartBarIcon as ChartBarMiniSolid,
  ArrowPathIcon as ArrowPathMiniSolid,
  GlobeAmericasIcon as GlobeAmericasMiniSolid,
  ArrowTopRightOnSquareIcon as ArrowTopRightOnSquareMiniSolid,
  TrashIcon as TrashMiniSolid,
  MapIcon as MapMiniSolid,
  ExclamationCircleIcon as ExclamationCircleMiniSolid,
  DocumentTextIcon as DocumentTextMiniSolid,
  MegaphoneIcon as MegaphoneMiniSolid,
  HomeIcon as HomeMiniSolid,
  QuestionMarkCircleIcon as QuestionMarkCircleMiniSolid,
  UsersIcon as UsersMiniSolid,
  UserGroupIcon as UserGroupMiniSolid,
} from '@heroicons/react/20/solid';

export {
  XMarkIcon as XMarkSolid,
  UserCircleIcon as UserCircleSolid,
  MagnifyingGlassIcon as MagnifyingGlassSolid,
  CheckIcon as CheckSolid,
  PlusIcon as PlusSolid,
  CheckBadgeIcon as CheckBadgeSolid,
  MapPinIcon as MapPinSolid,
  ChevronRightIcon as ChevronRightSolid,
  ArrowUpIcon as ArrowUpSolid,
  ArrowDownIcon as ArrowDownSolid,
  ArrowSmallUpIcon as ArrowSmallUpSolid,
  ArrowSmallDownIcon as ArrowSmallDownSolid,
  BookmarkIcon as BookmarkSolid,
  HandRaisedIcon as HandRaisedSolid,
  ArrowPathIcon as ArrowPathSolid,
  PencilIcon as PencilSolid,
  ExclamationTriangleIcon as ExclamationTriangleSolid,
  SparklesIcon as SparklesSolid,
  LightBulbIcon as LightBulbSolid,
  FunnelIcon as FunnelSolid,
  PhotoIcon as PhotoSolid,
  ChatBubbleLeftEllipsisIcon as ChatBubbleLeftEllipsisSolid,
  DocumentTextIcon as DocumentTextSolid,
  MegaphoneIcon as MegaphoneSolid,
  CheckCircleIcon as CheckCircleSolid,
  HomeIcon as HomeSolid,
  InformationCircleIcon as InformationCircleSolid,
  ArrowRightIcon as ArrowRightSolid,
  QuestionMarkCircleIcon as QuestionMarkCircleSolid,
  UsersIcon as UsersSolid,
} from '@heroicons/react/24/solid';

export {
  BoltIcon as BoltOutline,
  XMarkIcon as XMarkOutline,
  ExclamationTriangleIcon as ExclamationTriangleOutline,
  ChatBubbleLeftEllipsisIcon as ChatBubbleLeftEllipsisOutline,
  TrashIcon as TrashOutline,
  MagnifyingGlassIcon as MagnifyingGlassOutline,
  WrenchIcon as WrenchOutline,
  ArrowsRightLeftIcon as ArrowsRightLeftOutline,
  MapPinIcon as MapPinOutline,
  ArrowPathIcon as ArrowPathOutline,
  PhotoIcon as PhotoOutline,
  PlusIcon as PlusOutline,
  ListBulletIcon as ListBulletOutline,
  ShareIcon as ShareOutline,
  BookmarkIcon as BookmarkOutline,
  QrCodeIcon as QrCodeOutline,
  HandRaisedIcon as HandRaisedOutline,
  ArrowTopRightOnSquareIcon as ArrowTopRightOnSquareOutline,
  EllipsisHorizontalIcon as EllipsisHorizontalOutline,
  EllipsisVerticalIcon as EllipsisVerticalOutline,
  PencilIcon as PencilOutline,
  ExclamationCircleIcon as ExclamationCircleOutline,
  LightBulbIcon as LightBulbOutline,
  DocumentTextIcon as DocumentTextOutline,
  MegaphoneIcon as MegaphoneOutline,
  CheckCircleIcon as CheckCircleOutline,
  HomeIcon as HomeOutline,
  InformationCircleIcon as InformationCircleOutline,
  ChevronDownIcon as ChevronDownOutline,
  ArrowRightIcon as ArrowRightOutline,
  QuestionMarkCircleIcon as QuestionMarkCircleOutline,
  ChevronDoubleUpIcon as ChevronDoubleUpOutline,
  UsersIcon as UsersOutline,
} from '@heroicons/react/24/outline';

/*
TODO Rename existing icons

 */
