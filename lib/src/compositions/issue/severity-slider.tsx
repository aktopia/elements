import { ArrowPathMiniSolid, ChartBarMiniSolid, GlobeAmericasMiniSolid } from '@elements/icons';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import {
  Root as SliderRoot,
  Thumb as SliderThumb,
  Track as SliderTrack,
} from '@radix-ui/react-slider';
import { useCallback } from 'react';
import { suspensify } from '@elements/components/suspensify';

const SEVERITY_MIN = 0;
const SEVERITY_MAX = 10;
const SEVERITY_STEP = 1;

export const SeveritySlider = suspensify(() => {
  const t = useTranslation();
  const issueId = useValue('current.issue/id');

  const reset = useDispatch('issue.severity/reset');

  const onReset = useCallback(() => {
    reset({ 'ref/id': issueId, 'ref/attribute': 'entity.type/issue' });
  }, [issueId, reset]);

  return (
    <div className={'flex w-full flex-col items-center justify-center gap-2.5'}>
      <div className={'flex items-end justify-between self-stretch'}>
        <div className={'relative flex items-center justify-center gap-2'}>
          <ChartBarMiniSolid className={'h-3 w-3 text-gray-500'} />
          <p className={'text-left text-xs text-gray-600'}>{t('common/severity')}</p>
        </div>
        <div className={'flex items-start justify-start gap-1'} />
        <button
          className={'rounded-full border border-gray-300 p-0.5 shadow-sm'}
          type={'button'}
          onClick={onReset}>
          <ArrowPathMiniSolid className={'h-4 w-4 text-gray-500'} />
        </button>
      </div>
      <div className={'flex w-full items-center justify-center gap-2 self-stretch'}>
        <p className={'text-left text-xs font-medium text-gray-600'}>{SEVERITY_MIN}</p>
        <SliderRoot
          className={'relative flex w-full items-center justify-center'}
          defaultValue={[5]}
          max={SEVERITY_MAX}
          min={SEVERITY_MIN}
          step={SEVERITY_STEP}>
          <SliderTrack
            className={
              'h-2 w-full rounded-lg bg-gradient-to-r from-yellow-300 via-orange-400 to-rose-600 shadow-inner'
            }
          />
          <div className={'absolute -top-8 flex flex-col items-center justify-center gap-2'}>
            <GlobeAmericasMiniSolid className={'h-5 w-5 text-gray-500'} />
            <div className={'h-4 w-0.5 rounded-full bg-gray-500 shadow-md'} />
          </div>
          <SliderThumb
            aria-label={'Severity'}
            className={
              'flex h-5 w-5 rounded-full border-4 border-rose-400 bg-white p-0.5 shadow-md focus:outline-none'
            }
          />
        </SliderRoot>
        <p className={'text-left text-xs font-medium text-gray-600'}>{SEVERITY_MAX}</p>
      </div>
    </div>
  );
});
