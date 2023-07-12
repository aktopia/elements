import { suspensify } from '@elements/components/suspensify';
import { useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';

interface Relation {
  id: string;
  relation: 'resolves' | 'partially-resolves';
  type: 'issue' | 'action';
  title: string;
}

interface RelationsProps {
  refId: string;
  refAttribute: string;
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
