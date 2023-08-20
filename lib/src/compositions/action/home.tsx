import { TrophyMiniSolid } from '@elements/icons';
import { suspensify } from '@elements/components/suspensify';
import { Relationships } from '@elements/compositions/relationships';
import { TextEditor } from '@elements/compositions/text-editor';
import { useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { memo, useMemo } from 'react';

const DescriptionText = suspensify(() => {
  const t = useTranslation();

  const actionId = useValue<string>('current.action/id');
  const description = useValue<string>('action/description', { 'action/id': actionId });

  return description ? (
    <TextEditor
      className={'text-gray-700'}
      content={description}
      placeholder={t('action.description/placeholder')}
      refAttribute={'action.description/text'}
      refId={actionId}
      suspenseLines={3}
    />
  ) : (
    <p className={'text-gray-400'}>{t('action.description/empty')}</p>
  );
});

const Description = memo(() => {
  const t = useTranslation();

  return (
    <div className={'flex w-full flex-col gap-4'}>
      <div className={'flex items-center gap-3'}>
        <div className={'text-sm font-medium text-gray-500'}>{t('action/description')}</div>
      </div>
      <DescriptionText suspenseLines={6} />
    </div>
  );
});

const OutcomeText = suspensify(() => {
  const t = useTranslation();

  const actionId = useValue<string>('current.action/id');
  const outcome = useValue<string>('action/outcome', { 'action/id': actionId });
  const reference = useMemo(
    () => ({ 'ref/id': actionId, 'ref/attribute': 'action.outcome/text' }),
    [actionId]
  );

  const isEditing = useValue<boolean>('text-editor/editing', reference) || false;

  return outcome ? (
    <TextEditor
      className={isEditing ? 'text-gray-700' : 'text-blue-700'}
      content={outcome}
      placeholder={t('action.outcome/placeholder')}
      refAttribute={'action.outcome/text'}
      refId={actionId}
      suspenseLines={3}
    />
  ) : (
    <p className={'text-gray-400'}>{t('action.outcome/empty')}</p>
  );
});

const Outcome = memo(() => {
  const t = useTranslation();

  return (
    <div className={'flex w-full flex-col gap-4 rounded-lg border border-blue-600 bg-blue-50 p-6'}>
      <div className={'flex items-center gap-3'}>
        <TrophyMiniSolid className={'h-4 w-4 text-blue-700'} />
        <div className={'text-sm font-medium text-blue-700'}>{t('action/promised-outcome')}</div>
      </div>
      <OutcomeText suspenseColor={'primary'} suspenseLines={6} />
    </div>
  );
});

export const Home = suspensify(() => {
  const actionId = useValue<string>('current.action/id');

  return (
    <div className={'flex w-full gap-8'}>
      <div className={'flex w-full flex-col gap-12'}>
        <Description />
        <Outcome />
      </div>
      <Relationships refAttribute={'action/id'} refId={actionId} suspenseLines={8} />
    </div>
  );
});
