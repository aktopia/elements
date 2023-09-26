import { CheckBadgeSolid } from '@elements/icons';
import { suspensify } from '@elements/components/suspensify';
import { Relationships } from '@elements/compositions/relationships';
import { TextEditor } from '@elements/compositions/text-editor';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { useMemo } from 'react';
import { EditButton } from '@elements/components/edit-button';

const DescriptionText = suspensify(() => {
  const t = useTranslation();

  const issueId = useValue('current.issue/id');
  const description = useValue('issue.description/text', { 'issue/id': issueId });

  const noContent = <p className={'text-gray-400'}>{t('issue.description/empty')}</p>;

  return (
    <TextEditor
      className={'text-gray-700'}
      content={description}
      noContent={noContent}
      placeholder={t('issue.description/placeholder')}
      refAttribute={'issue.description/text'}
      refId={issueId}
      richText={false}
      suspenseLines={3}
    />
  );
});

const Description = suspensify(() => {
  const t = useTranslation();

  const canEdit = useValue('issue.description/can-edit');

  const onEdit = useDispatch('issue.description/edit');

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

const ResolutionText = suspensify(() => {
  const t = useTranslation();
  const issueId = useValue('current.issue/id');
  const resolution = useValue('issue.resolution/text', { 'issue/id': issueId });

  const reference = useMemo(
    () => ({ 'ref/id': issueId, 'ref/attribute': 'issue.resolution/text' }),
    [issueId]
  );

  const isEditing = useValue('text-editor/editing', reference);

  const noContent = <p className={'text-gray-400'}>{t('issue.resolution/empty')}</p>;

  return (
    <TextEditor
      className={isEditing ? 'text-gray-700' : 'text-blue-700'}
      content={resolution}
      noContent={noContent}
      refAttribute={'issue.resolution/text'}
      refId={issueId}
      richText={false}
      suspenseLines={3}
    />
  );
});

const Resolution = suspensify(() => {
  const t = useTranslation();

  const canEdit = useValue('issue.resolution/can-edit');

  const onEdit = useDispatch('issue.resolution/edit');

  return (
    <div className={'flex w-full flex-col gap-4 rounded-md border border-blue-600 bg-blue-50 p-6'}>
      <div className={'flex items-center justify-between'}>
        <div className={'flex items-center gap-3'}>
          <CheckBadgeSolid className={'h-5 w-5 text-blue-700'} />
          <div className={'text-sm font-medium text-blue-700'}>
            {t('issue/expected-resolution')}
          </div>
        </div>
        <EditButton canEdit={canEdit} className={'h-4 w-4 text-gray-500'} onEdit={onEdit} />
      </div>
      <ResolutionText suspenseColor={'primary'} suspenseLines={6} />
    </div>
  );
});

export const Home = suspensify(() => {
  const issueId = useValue('current.issue/id');

  return (
    <div className={'flex w-full flex-col gap-8 md:flex-row'}>
      <div className={'flex w-full flex-col gap-10 md:w-[65%]'}>
        <Description suspenseLines={6} />
        <Resolution />
      </div>
      <div className={'w-full md:w-[35%]'}>
        <Relationships refAttribute={'issue/id'} refId={issueId} suspenseLines={8} />
      </div>
    </div>
  );
});
