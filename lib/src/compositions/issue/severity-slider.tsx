import { ArrowPathMiniSolid, ChartBarMiniSolid, GlobeAmericasMiniSolid } from '@elements/_icons';

export const SeveritySlider = ({}) => {
  return (
    <div className={'relative flex w-full flex-col items-center justify-center gap-2.5'}>
      <div className={'flex items-end justify-between self-stretch'}>
        <div className={'relative flex items-center justify-center gap-2'}>
          <ChartBarMiniSolid className={'h-3 w-3 text-gray-500'} />
          <p className={'  text-left text-xs text-gray-600'}>{'Severity'}</p>
        </div>
        <div className={'flex items-start justify-start gap-1'} />
        <button className={'rounded-full border border-gray-300 p-0.5 shadow-sm'} type={'button'}>
          <ArrowPathMiniSolid className={'h-4 w-4 text-gray-500'} />
        </button>
      </div>
      <div className={'relative flex items-center justify-center gap-2 self-stretch'}>
        <p className={'text-left text-xs font-medium text-gray-600'}>{'0'}</p>
        <div
          className={
            'relative h-2 w-full rounded-lg bg-gradient-to-r from-yellow-300 via-orange-400 to-rose-600 shadow-inner'
          }
        />
        <p className={'text-left text-xs font-medium text-gray-600'}>{'10'}</p>
      </div>
      <div className={'absolute left-[80%] top-1 flex flex-col items-center justify-center gap-2'}>
        <GlobeAmericasMiniSolid className={'h-5 w-5 text-gray-500'} />
        {/*<CaratUpSolid className={'h-5 w-5 text-gray-500'} />*/}
        <div className={'h-4 w-0.5 rounded-full bg-gray-500 shadow-md'} />
      </div>
      <div
        className={
          'absolute left-[121px] top-7 flex h-5 w-5 items-center justify-start gap-2.5 rounded-full border-4 border-rose-400 bg-white p-0.5 shadow-md'
        }
      />
    </div>
  );
};
