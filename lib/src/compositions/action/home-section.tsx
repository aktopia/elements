import { TrophyMiniSolid } from '@elements/_icons';
import { Button } from '@elements/components/button';
import RichTextArea from '@elements/components/rich-text-area';
import { suspensify } from '@elements/components/suspensify';
import { WithContextMenu } from '@elements/components/with-context-menu';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { memo, useCallback } from 'react';

const TextAreaEditor = suspensify(({ value, onSave, onCancel, onChange }: any) => {
  const t = useTranslation();
  return (
    <div
      className={
        'flex flex-col items-end justify-start gap-3 rounded-lg border border-gray-400 bg-gray-50 p-3 text-gray-700 shadow-inner'
      }>
      <RichTextArea initialValue={value} onChange={onChange} />
      <div className={'flex items-start justify-end gap-3'}>
        <Button kind={'tertiary'} size={'xs'} value={t('common/cancel')} onClick={onCancel} />
        <Button
          color={'green'}
          kind={'primary'}
          size={'xs'}
          value={t('common/save')}
          onClick={onSave}
        />
      </div>
    </div>
  );
});

const Description = suspensify(() => {
  const t = useTranslation();
  const actionId = useValue('current.action/id');
  const description = useValue<string>('action/description', { 'action/id': actionId });
  const isEditing = useValue<boolean>('current.action.description/editing');
  const editDescription = useDispatch('action.description/edit');
  const onEditClick = useCallback((_id: string) => editDescription({}), [editDescription]);

  return isEditing ? (
    <TextAreaEditor
      value={description}
      onCancel={console.log}
      onChange={console.log}
      onSave={console.log}
    />
  ) : (
    <WithContextMenu items={[{ id: 'edit', label: t('common/edit') }]} onItemClick={onEditClick}>
      <div className={'text-gray-700'}>{description}</div>
    </WithContextMenu>
  );
});

const OutcomeText = suspensify(() => {
  const t = useTranslation();
  const actionId = useValue<string>('current.action/id');
  const outcome = useValue<string>('action/outcome', { 'action/id': actionId });
  const isEditing = useValue<boolean>('current.action.outcome/editing');
  const editOutcome = useDispatch('action.outcome/edit');
  const onEditClick = useCallback((_id: string) => editOutcome({}), [editOutcome]);

  return isEditing ? (
    <TextAreaEditor
      value={outcome}
      onCancel={console.log}
      onChange={console.log}
      onSave={console.log}
    />
  ) : (
    <WithContextMenu items={[{ id: 'edit', label: t('common/edit') }]} onItemClick={onEditClick}>
      <div className={'text-blue-700'}>{outcome}</div>
    </WithContextMenu>
  );
});

const Outcome = memo(() => {
  const t = useTranslation();

  return (
    <div className={'flex w-full flex-col gap-2 rounded-md border border-blue-600 bg-blue-50 p-6'}>
      <div className={'flex items-center gap-3'}>
        <TrophyMiniSolid className={'h-4 w-5 text-blue-700'} />
        <div className={'font-medium text-blue-700'}>{t('common/outcome')}</div>
      </div>
      <OutcomeText suspenseColor={'primary'} suspenseLines={6} />
    </div>
  );
});

interface Relation {
  relation: 'resolves' | 'partially-resolves';
  type: 'issue' | 'action';
  title: string;
}

const relationTypeTKey = {
  issue: 'common/issue',
  action: 'common/action',
};

const relationTKey = {
  resolves: 'relation/resolves',
  'partially-resolves': 'relation/partially-resolves',
  relates: 'relation/relates',
};

const Relation = suspensify(({ id }: any) => {
  const t = useTranslation();
  const relation = useValue<Relation>('action/relation', {
    'relation/id': id,
  });

  return (
    <div className={'flex flex-col gap-2 rounded-md border border-gray-300 p-4 shadow-sm'}>
      <div className={'flex'}>
        <div>{t(relationTKey[relation.relation])}</div>
        <div className={'w-max rounded border border-rose-200 bg-rose-50 px-2 py-1 shadow-inner'}>
          <p className={'text-xs font-medium text-rose-600'}>
            {t(relationTypeTKey[relation.type])}
          </p>
        </div>
      </div>
      <div className={'text-gray-700'}>{relation.title}</div>
    </div>
  );
});

const Relations = suspensify(() => {
  const actionId = useValue('current.action/id');
  const relationIds = useValue<{ type: string; title: string }[]>('action.relation/ids', {
    'action/id': actionId,
  });

  return (
    <div className={'flex flex-col gap-5'}>
      {relationIds.map((relationId) => (
        <Relation key={relationId} id={relationId} suspenseLines={3} />
      ))}
    </div>
  );
});

export const HomeSectionFuture = () => {
  return (
    <div className={'flex w-full gap-8'}>
      <div className={'flex w-full flex-col gap-5'}>
        <Description suspenseLines={6} />
        <Outcome />
      </div>
      <Relations suspenseLines={8} />
    </div>
  );
};

export const HomeSection = () => {
  return (
    <div className={'flex w-full flex-col gap-5'}>
      <Description suspenseLines={6} />
      <Outcome />
    </div>
  );
};
