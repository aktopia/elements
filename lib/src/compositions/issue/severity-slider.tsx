import {
  ArrowPathMiniSolid,
  ChartBarMiniSolid,
  ExclamationTriangleMiniSolid,
  ExclamationTriangleOutline,
  ExclamationTriangleSolid,
  GlobeAmericasMiniSolid,
} from '@elements/icons';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { Slider, SliderThumb, SliderTrack } from 'react-aria-components';
import { useCallback, useState } from 'react';
import { suspensify } from '@elements/components/suspensify';
import { cx } from '@elements/utils';

const DEFAULT_VALUE = 5;
const SEVERITY_MIN = 0;
const SEVERITY_MAX = 10;
const SEVERITY_STEP = 1;

const THUMB_OFFSET = -1;

const UserScoreThumb = ({ chosen }: any) => {
  return (
    <SliderThumb
      aria-label={'Severity'}
      className={cx(
        'absolute top-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-white p-0.5 shadow-md focus:outline-none',
        chosen ? 'border-4 border-rose-400' : 'bg-white outline-dashed outline-1 outline-rose-500'
      )}
    />
  );
};

// const AverageScoreThumb = ({ score }: any) => {
//   const percent = (score / SEVERITY_MAX) * 100;
//   const p = `calc(${percent}% + ${THUMB_OFFSET}px)`;
//
//   return (
//     <div
//       className={
//         'absolute -top-2 rounded-full border border-gray-300 bg-white p-px shadow-inner focus:outline-none'
//       }
//       style={{ left: p }}>
//       <GlobeAmericasMiniSolid className={'h-5 w-5 text-gray-600'} />
//     </div>
//   );
// };

const AverageScoreThumb = ({ score }: any) => {
  const percent = (score / SEVERITY_MAX) * 100;
  const p = `calc(${percent}% + ${THUMB_OFFSET}px)`;

  return <div className={'absolute -top-1.5 h-5 w-0.5 rounded bg-gray-600'} style={{ left: p }} />;
};

const SeverityScore = suspensify(() => {
  const issueId = useValue('current.issue/id');
  const score = useValue('issue.severity/score', { 'issue/id': issueId });
  const voted = useValue('issue.current.user.severity/voted', { 'issue/id': issueId });

  const onClick = useDispatch('issue.severity.vote/initiate') as () => void;

  return (
    <button className={'group flex items-center gap-2'} type={'button'} onClick={onClick}>
      {voted ? (
        <ExclamationTriangleOutline className={'h-7 w-7 text-gray-400'} />
      ) : (
        <ExclamationTriangleOutline
          className={'h-7 w-7 text-gray-400 group-hover:text-orange-500'}
        />
      )}
      <span className={'text-sm text-gray-500'}>{'Severity'}</span>
      <p
        className={cx(
          'text font-medium',
          voted ? 'text-gray-700' : 'text-gray-600 group-hover:text-orange-700'
        )}>
        {score}
      </p>
      <span className={'group flex items-center gap-1'}>
        <span className={'text-sm text-gray-500'}>{'from'}</span>
        <span className={'text-sm font-medium text-gray-600'}>{'300'}</span>
        <span className={'text-sm text-gray-500'}>{'votes'}</span>
      </span>
    </button>
  );
});

const ResetButton = ({ onClick }: any) => {
  return (
    <button
      className={'rounded-full border border-gray-300 p-0.5 shadow-sm'}
      type={'button'}
      onClick={onClick}>
      <ArrowPathMiniSolid className={'h-4 w-4 text-gray-500'} />
    </button>
  );
};

export const SeveritySlider = suspensify(() => {
  const t = useTranslation();
  const userScore = 10;
  const avgScore = 7;
  const [currentUserScore, setCurrentUserScore] = useState(userScore || avgScore);
  const issueId = useValue('current.issue/id');

  console.log(currentUserScore);

  const onValueChange = useCallback((value: number[]) => {
    setCurrentUserScore(value[0]);
  }, []);

  const reset = useDispatch('issue.severity/reset');
  const onReset = useCallback(() => {
    reset({ 'ref/id': issueId, 'ref/attribute': 'entity.type/issue' });
  }, [issueId, reset]);

  return (
    <div className={'flex w-full flex-col items-center justify-center gap-2.5'}>
      <div className={'flex items-end justify-end self-stretch'}>
        {/*<div className={'flex items-center justify-center gap-2'}>*/}
        {/*  <ChartBarMiniSolid className={'h-3 w-3 text-gray-500'} />*/}
        {/*  <p className={'text-left text-xs text-gray-600'}>{t('common/severity')}</p>*/}
        {/*</div>*/}
        {/*<ResetButton onClick={onReset} />*/}
        {/*<div className={'flex items-center gap-2'}>*/}
        {/*  <div className={'flex gap-1 text-xs text-gray-500'}>*/}
        {/*    <span className={'font-bold'}>{7.3}</span>*/}
        {/*    <span>{'Average Severity'}</span>*/}
        {/*  </div>*/}
        {/*  <div className={'h-1 w-1 rounded-full bg-gray-300'} />*/}
        {/*  <div className={'flex gap-1 text-xs text-gray-500'}>*/}
        {/*    <span className={'font-bold'}>{300}</span>*/}
        {/*    <span>{'Votes'}</span>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
      <div className={'flex w-full flex-col items-start justify-center gap-2'}>
        <SeverityScore />
        <Slider
          aria-label={'severity'}
          className={'relative w-full'}
          defaultValue={[DEFAULT_VALUE]}
          maxValue={SEVERITY_MAX}
          minValue={SEVERITY_MIN}
          step={SEVERITY_STEP}
          value={[currentUserScore]}
          onChange={onValueChange}>
          <SliderTrack
            className={
              'h-2 w-full rounded-lg bg-gradient-to-r from-yellow-300 via-orange-400 to-rose-600 shadow-inner'
            }
          />
          <AverageScoreThumb score={avgScore} />
          <UserScoreThumb chosen={false} />
        </Slider>
      </div>
    </div>
  );
});
