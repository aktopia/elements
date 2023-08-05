import { ArrowsRightLeftOutline, WrenchOutline } from '@elements/_icons';
import { suspensify } from '@elements/components/suspensify';
import { EntityType } from '@elements/compositions/entity-type';
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

const relationTKey = {
  resolves: 'relation/resolves',
  'partially-resolves': 'relation/partially-resolves',
  relates: 'relation/relates',
};

const icon = {
  resolves: WrenchOutline,
  'partially-resolves': WrenchOutline,
  relates: ArrowsRightLeftOutline,
};

const Relationship = suspensify(({ id }: any) => {
  const t = useTranslation();
  const relationship = useValue<Relation>('relationship/data', {
    'relation/id': id,
  });

  const Icon = icon[relationship.relation];

  return (
    <div className={'flex flex-col gap-2 rounded-lg border border-gray-300 p-4 shadow-sm'}>
      <div className={'flex items-center justify-between'}>
        <div className={'flex items-center gap-2'}>
          <Icon className={'h-5 w-5 text-gray-500'} />
          <div className={'text-sm text-gray-500'}>{t(relationTKey[relationship.relation])}</div>
        </div>
        <EntityType type={relationship.type} />
      </div>
      <div className={'text-gray-700'}>{relationship.title}</div>
    </div>
  );
});

export const Relationships = suspensify(({ refId, refAttribute }: RelationsProps) => {
  const t = useTranslation();
  const relationIds = useValue<string[]>('relationship/ids', {
    'ref/id': refId,
    'ref/attribute': refAttribute,
  });

  return (
    <div className={'flex flex-col gap-3'}>
      {/*<div className={'text-sm font-medium text-gray-500'}>{t('common/relationships')}</div>*/}
      <div className={'flex flex-col gap-5'}>
        {relationIds.length > 0 ? (
          relationIds.map((relationId) => (
            <Relationship key={relationId} id={relationId} suspense={{ lines: 3 }} />
          ))
        ) : (
          <div className={'text-sm text-gray-500'}>{t('relationships/empty')}</div>
        )}
      </div>
    </div>
  );
});
