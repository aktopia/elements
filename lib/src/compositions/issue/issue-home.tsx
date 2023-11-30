import { CheckBadgeSolid } from '@elements/icons';
import { suspensify } from '@elements/components/suspensify';
import { Relationships } from '@elements/compositions/relationships';
import { TextEditor } from '@elements/compositions/text-editor';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { EditButton } from '@elements/components/edit-button';
import { useIdent } from '@elements/store/hooks';

const Description = suspensify(() => {
  const t = useTranslation();

  const issueId = useValue('current.issue/id');
  const canEdit = useValue('issue.description/can-edit', { 'issue/id': issueId });
  const description = useValue('issue.description/text', { 'issue/id': issueId });

  const onEdit = useDispatch('issue.description/edit');

  const noContent = <p className={'text-gray-400'}>{t('issue.description/empty')}</p>;

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
        placeholder={t('issue.description/placeholder')}
        refAttribute={'issue.description/text'}
        refId={issueId}
        richText={false}
        suspenseLines={3}
      />
    </div>
  );
});

const Resolution = suspensify(() => {
  const t = useTranslation();

  const issueId = useValue('current.issue/id');
  const resolution = useValue('issue.resolution/text', { 'issue/id': issueId });
  const canEdit = useValue('issue.resolution/can-edit', { 'issue/id': issueId });

  const ref = useIdent('issue.resolution/text', issueId);

  const isEditing = useValue('text-editor/editing', { ref });

  const onEdit = useDispatch('issue.resolution/edit');
  const noContent = <p className={'text-gray-400'}>{t('issue.resolution/empty')}</p>;

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
      <TextEditor
        className={isEditing ? 'text-gray-700' : 'text-blue-700'}
        content={resolution}
        noContent={noContent}
        refAttribute={'issue.resolution/text'}
        refId={issueId}
        richText={false}
        suspenseLines={3}
      />
    </div>
  );
});

export const IssueHome = suspensify(() => {
  const issueId = useValue('current.issue/id');
  const lookupRef = useIdent('issue/id', issueId);

  return (
    <div className={'flex w-full flex-col gap-8 md:flex-row'}>
      <div className={'flex w-full flex-col gap-10 md:w-[65%]'}>
        <Description suspenseLines={6} />
        <Resolution />
      </div>
      <div className={'w-full md:w-[35%]'}>
        <Relationships lookupRef={lookupRef} suspenseLines={8} />
      </div>
    </div>
  );
});
