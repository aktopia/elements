import { TrophyMiniSolid } from '@elements/icons';
import { suspensify } from '@elements/components/suspensify';
import { Relationships } from '@elements/compositions/relationships';
import { TextEditor } from '@elements/compositions/text-editor';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { useMemo } from 'react';
import { EditButton } from '@elements/components/edit-button';

const DescriptionText = suspensify(() => {
  const t = useTranslation();

  const actionId = useValue('current.action/id');
  const description = useValue('action.description/text', { 'action/id': actionId });

  const noContent = <p className={'text-gray-400'}>{t('action.description/empty')}</p>;

  return (
    <TextEditor
      className={'text-gray-700'}
      content={description}
      noContent={noContent}
      placeholder={t('action.description/placeholder')}
      refAttribute={'action.description/text'}
      refId={actionId}
      richText={false}
      suspenseLines={3}
    />
  );
});

const Description = suspensify(() => {
  const t = useTranslation();
  const canEdit = useValue('action.description/can-edit');
  const onEdit = useDispatch('action.description/edit');

  return (
    <div className={'flex w-full flex-col gap-4'}>
      <div className={'flex items-center justify-between'}>
        <div className={'text-sm font-medium text-gray-500'}>{t('common/description')}</div>
        <EditButton
          canEdit={canEdit}
          className={'h-4 w-4 text-gray-500'}
          suspenseLines={1}
          onEdit={onEdit}
        />
      </div>
      <DescriptionText suspenseLines={6} />
    </div>
  );
});

const OutcomeText = suspensify(() => {
  const t = useTranslation();

  const actionId = useValue('current.action/id');
  const outcome = useValue('action.outcome/text', { 'action/id': actionId });
  const reference = useMemo(
    () => ({ 'ref/id': actionId, 'ref/attribute': 'action.outcome/text' }),
    [actionId]
  );

  const isEditing = useValue('text-editor/editing', reference);

  const noContent = <p className={'text-gray-400'}>{t('action.outcome/empty')}</p>;

  return (
    <TextEditor
      className={isEditing ? 'text-gray-700' : 'text-blue-700'}
      content={outcome}
      noContent={noContent}
      placeholder={t('action.outcome/placeholder')}
      refAttribute={'action.outcome/text'}
      refId={actionId}
      richText={false}
      suspenseLines={3}
    />
  );
});

const Outcome = suspensify(() => {
  const t = useTranslation();
  const canEdit = useValue('action.outcome/can-edit');
  const onEdit = useDispatch('action.outcome/edit');

  return (
    <div className={'flex w-full flex-col gap-4 rounded-lg border border-blue-600 bg-blue-50 p-6'}>
      <div className={'flex items-center justify-between'}>
        <div className={'flex items-center gap-3'}>
          <TrophyMiniSolid className={'h-4 w-4 text-blue-700'} />
          <div className={'text-sm font-medium text-blue-700'}>{t('action/promised-outcome')}</div>
        </div>
        <EditButton canEdit={canEdit} className={'h-4 w-4 text-gray-500'} onEdit={onEdit} />
      </div>
      <OutcomeText suspenseColor={'primary'} suspenseLines={6} />
    </div>
  );
});

export const Home = suspensify(() => {
  const actionId = useValue('current.action/id');

  return (
    <div className={'flex w-full flex-col gap-8 md:flex-row'}>
      <div className={'flex w-full flex-col gap-10 md:w-[65%]'}>
        <Description />
        <Outcome />
      </div>
      <div className={'w-full md:w-[35%]'}>
        <Relationships refAttribute={'action/id'} refId={actionId} suspenseLines={8} />
      </div>
    </div>
  );
});
