import { CheckBadgeSolid } from '@elements/_icons';
import { suspensify } from '@elements/components/suspensify';
import { Relationships } from '@elements/compositions/relationships';
import { TextEditor } from '@elements/compositions/text-editor';
import { useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { memo, useMemo } from 'react';

const Description = suspensify(() => {
  const issueId = useValue<string>('current.issue/id');
  const description = useValue<string>('issue/description', { 'issue/id': issueId });

  return (
    <TextEditor
      className={'text-gray-700'}
      content={description}
      refAttribute={'issue.description/text'}
      refId={issueId}
      suspense={{ lines: 3 }}
    />
  );
});

const ResolutionText = suspensify(() => {
  const issueId = useValue<string>('current.issue/id');
  const resolution = useValue<string>('issue/resolution', { 'issue/id': issueId });
  const reference = useMemo(
    () => ({ 'ref/id': issueId, 'ref/attribute': 'issue.resolution/text' }),
    [issueId]
  );

  const isEditing = useValue<boolean>('text-editor/editing', reference) || false;

  return (
    <TextEditor
      className={isEditing ? 'text-gray-700' : 'text-blue-700'}
      content={resolution}
      refAttribute={'issue.resolution/text'}
      refId={issueId}
      suspense={{ lines: 3 }}
    />
  );
});

const Resolution = memo(() => {
  const t = useTranslation();

  return (
    <div className={'flex w-full flex-col gap-2 rounded-md border border-blue-600 bg-blue-50 p-6'}>
      <div className={'flex items-center gap-3'}>
        <CheckBadgeSolid className={'h-5 w-5 text-blue-700'} />
        <div className={'font-medium text-blue-700'}>{t('issue/expected-resolution')}</div>
      </div>
      <ResolutionText suspense={{ lines: 6, color: 'primary' }} />
    </div>
  );
});

export const Home = suspensify(() => {
  const issueId = useValue<string>('current.issue/id');

  return (
    <div className={'flex w-full gap-8'}>
      <div className={'flex w-full flex-col gap-5'}>
        <Description suspense={{ lines: 6 }} />
        <Resolution />
      </div>
      <Relationships refAttribute={'issue/id'} refId={issueId} suspense={{ lines: 8 }} />
    </div>
  );
});
