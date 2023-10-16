import { suspensify } from '@elements/components/suspensify';
import { useValue } from '@elements/store';
import { EntityTypeBadge } from '@elements/compositions/entity-type-badge';
import { EntityType as Type, type LookupRef } from '@elements/types';
import { LastActive } from '@elements/compositions/last-active';
import { Link } from '@elements/components/link';
import { Voting } from '@elements/compositions/voting';
import { wrapPage } from '@elements/compositions/wrap-page';
import { useMemo } from 'react';

export const InitiativeCard = suspensify(({ id: slug }: any) => {
  const title = useValue('meta.initiative.title/text', { 'meta.initiative/slug': slug });
  const updatedAt = useValue('meta.initiative/updated-at', { 'meta.initiative/slug': slug });
  const lookupRef = useMemo(() => ['meta.initiative/slug', slug] as LookupRef, [slug]);

  return (
    <div
      className={
        'flex w-full flex-col items-start justify-center gap-7 rounded-lg border border-gray-300 bg-white p-5 shadow-sm'
      }>
      <div className={'flex items-center gap-7'}>
        <EntityTypeBadge size={'sm'} type={Type.MetaInitiative} />
        <LastActive timestamp={updatedAt} />
      </div>
      <Link
        className={'text-xl font-medium hover:underline w-full'}
        href={`/meta/initiative/${slug}`}>
        {title}
      </Link>
      <div className={'flex items-center gap-10'}>
        <Voting lookupRef={lookupRef} size={'sm'} suspenseLines={2} />
      </div>
    </div>
  );
});

export const Initiatives = wrapPage(() => {
  const slugs = useValue('meta.initiative/slugs');

  return (
    <div>
      <div>
        {slugs.map((id) => (
          <InitiativeCard key={id} id={id} suspenseLines={2} />
        ))}
      </div>
    </div>
  );
});
