import { TrophyMiniSolid } from '@elements/icons';
import { suspensify } from '@elements/components/suspensify';
import { Relationships } from '@elements/compositions/relationships';
import { TextEditor } from '@elements/compositions/text-editor';
import { useDispatch, useValue } from '@elements/store/interface';
import { useTranslation } from '@elements/translation';
import { EditButton } from '@elements/components/edit-button';
import { useIdent } from '@elements/store/hooks';

const Description = suspensify(() => {
  const t = useTranslation();

  const actionId = useValue('current.action/id');
  const description = useValue('action.description/text', { 'action/id': actionId });
  const canEdit = useValue('action.description/can-edit', { 'action/id': actionId });

  const onEdit = useDispatch('action.description/edit');

  const noContent = <p className={'text-gray-400'}>{t('action.description/empty')}</p>;

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
    </div>
  );
});

const Outcome = suspensify(() => {
  const t = useTranslation();

  const actionId = useValue('current.action/id');
  const canEdit = useValue('action.outcome/can-edit', { 'action/id': actionId });
  const outcome = useValue('action.outcome/text', { 'action/id': actionId });
  const ref = useIdent('action.outcome/text', actionId);
  const isEditing = useValue('text-editor/editing', { ref });

  const onEdit = useDispatch('action.outcome/edit');

  const noContent = <p className={'text-gray-400'}>{t('action.outcome/empty')}</p>;

  return (
    <div className={'flex w-full flex-col gap-4 rounded-lg border border-blue-600 bg-blue-50 p-6'}>
      <div className={'flex items-center justify-between'}>
        <div className={'flex items-center gap-3'}>
          <TrophyMiniSolid className={'h-4 w-4 text-blue-700'} />
          <div className={'text-sm font-medium text-blue-700'}>{t('action/promised-outcome')}</div>
        </div>
        <EditButton canEdit={canEdit} className={'h-4 w-4 text-gray-500'} onEdit={onEdit} />
      </div>
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
    </div>
  );
});

export const ActionHome = suspensify(() => {
  const actionId = useValue('current.action/id');
  const lookupRef = useIdent('action/id', actionId);

  return (
    <div className={'flex w-full flex-col gap-8 md:flex-row'}>
      <div className={'flex w-full flex-col gap-10 md:w-[65%]'}>
        <Description />
        <Outcome />
      </div>
      <div className={'w-full md:w-[35%]'}>
        <Relationships lookupRef={lookupRef} suspenseLines={8} />
      </div>
    </div>
  );
});
