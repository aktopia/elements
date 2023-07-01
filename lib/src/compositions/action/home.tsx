import { TrophyMiniSolid } from '@elements/_icons';
import { suspensify } from '@elements/components/suspensify';
import { TextEditor } from '@elements/compositions/text-editor';
import { useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { memo, useMemo } from 'react';

const Description = suspensify(() => {
  const actionId = useValue<string>('current.action/id');
  const description = useValue<string>('action/description', { 'action/id': actionId });

  return (
    <TextEditor
      className={'text-gray-700'}
      content={description}
      refAttribute={'action.description/text'}
      refId={actionId}
      suspense={{ lines: 3 }}
    />
  );
});

const OutcomeText = suspensify(() => {
  const actionId = useValue<string>('current.action/id');
  const outcome = useValue<string>('action/outcome', { 'action/id': actionId });
  const reference = useMemo(
    () => ({ 'ref/id': actionId, 'ref/attribute': 'action.outcome/text' }),
    [actionId]
  );

  const isEditing = useValue<boolean>('text-editor/editing', reference) || false;

  return (
    <TextEditor
      className={isEditing ? 'text-gray-700' : 'text-blue-700'}
      content={outcome}
      refAttribute={'action.outcome/text'}
      refId={actionId}
      suspense={{ lines: 3 }}
    />
  );
});

const Outcome = memo(() => {
  const t = useTranslation();

  return (
    <div className={'flex w-full flex-col gap-2 rounded-md border border-blue-600 bg-blue-50 p-6'}>
      <div className={'flex items-center gap-3'}>
        <TrophyMiniSolid className={'h-4 w-5 text-blue-700'} />
        <div className={'font-medium text-blue-700'}>{t('common/expected-outcome')}</div>
      </div>
      <OutcomeText suspense={{ lines: 6, color: 'primary' }} />
    </div>
  );
});

interface Relation {
  id: string;
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

const Relationship = suspensify(({ id }: any) => {
  const t = useTranslation();
  const relationship = useValue<Relation>('relationship/data', {
    'relation/id': id,
  });

  return (
    <div className={'flex flex-col gap-2 rounded-md border border-gray-300 p-4 shadow-sm'}>
      <div className={'flex'}>
        <div>{t(relationTKey[relationship.relation])}</div>
        <div className={'w-max rounded border border-rose-200 bg-rose-50 px-2 py-1 shadow-inner'}>
          <p className={'text-xs font-medium text-rose-600'}>
            {t(relationTypeTKey[relationship.type])}
          </p>
        </div>
      </div>
      <div className={'text-gray-700'}>{relationship.title}</div>
    </div>
  );
});

interface RelationsProps {
  refId: string;
  refAttribute: string;
}

// TODO Make this generic
export const Relationships = suspensify(({ refId, refAttribute }: RelationsProps) => {
  const relationIds = useValue<string[]>('relationship/ids', {
    'ref/id': refId,
    'ref/attribute': refAttribute,
  });

  return (
    <div className={'flex flex-col gap-5'}>
      {relationIds.map((relationId) => (
        <Relationship key={relationId} id={relationId} suspense={{ lines: 3 }} />
      ))}
    </div>
  );
});

export const Home = suspensify(() => {
  const actionId = useValue<string>('current.action/id');

  return (
    <div className={'flex w-full gap-8'}>
      <div className={'flex w-full flex-col gap-5'}>
        <Description suspense={{ lines: 6 }} />
        <Outcome />
      </div>
      <Relationships refAttribute={'action/id'} refId={actionId} suspense={{ lines: 8 }} />
    </div>
  );
});
