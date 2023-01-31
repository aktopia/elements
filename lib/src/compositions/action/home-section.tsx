import { TrophyMiniSolid } from '@elements/_icons';
import { Skeleton } from '@elements/components/Skeleton';
import { useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { Suspense } from 'react';

const Description = () => {
  const actionId = useValue('current.action/id');
  const description = useValue<string>('action/description', { 'action/id': actionId });
  return <div className={'text-gray-700'}>{description}</div>;
};

// const withSkeleton =
//   (Component: ComponentType) =>
//   ({ skeletonCount, ...props }: any) => {
//     return (
//       <Suspense fallback={<Skeleton count={skeletonCount} />}>
//         <Component {...props} />
//       </Suspense>
//     );
//   };

const Outcome = () => {
  const t = useTranslation();
  console.log('rendering');
  const actionId = useValue<string>('current.action/id');
  const outcome = useValue<string>('action/outcome', { 'action/id': actionId });

  // const old = useRef();
  //
  // console.log('hello');
  // console.log(old.current === outcome);
  //
  // old.current = outcome;

  return (
    <div className={'flex flex-col gap-2 rounded-md border border-blue-600 bg-blue-50 p-6'}>
      <div className={'flex items-center gap-3'}>
        <TrophyMiniSolid className={'h-4 w-5 text-blue-700'} />
        <div className={'font-medium text-blue-700'}>{t('common/outcome', { a: 'what' })}</div>
      </div>
      <div className={'text-blue-700'}>{outcome}</div>
    </div>
  );
};

const Relations = () => {
  const actionId = useValue('current.action/id');
  const relations = useValue('action/relations', { 'action/id': actionId });
  relations;
  return <div />;
};

export const HomeSection = () => {
  return (
    <div className={'flex gap-8'}>
      <div className={'flex flex-col gap-5'}>
        <Description />
        <Suspense fallback={<Skeleton count={6} />}>
          <Outcome />
        </Suspense>
      </div>
      <Relations />
    </div>
  );
};
