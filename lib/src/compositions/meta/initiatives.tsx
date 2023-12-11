import { suspensify } from '@elements/components/suspensify';
import { useValue } from '@elements/store/interface';
import { EntityTypeBadge } from '@elements/compositions/entity-type-badge';
import { EntityType as Type } from '@elements/types';
import { LastActive } from '@elements/compositions/last-active';
import { Link } from '@elements/components/link';
import { UpVoting } from '@elements/compositions/voting';
import { wrapPage } from '@elements/compositions/wrap-page';
import { InitiativeStatus } from '@elements/compositions/meta/status';
import { useIdent } from '@elements/store/hooks';

export const InitiativeCard = suspensify(({ slug }: any) => {
  const title = useValue('meta.initiative.title/text', { 'meta.initiative/slug': slug });
  const updatedAt = useValue('meta.initiative/updated-at', { 'meta.initiative/slug': slug });
  const ident = useIdent('meta.initiative/slug', slug);

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
        href={`/meta/initiative/${slug}#tab=discuss`}>
        {title}
      </Link>
      <div className={'flex items-center gap-10'}>
        <UpVoting ident={ident} size={'sm'} suspenseLines={2} />
        <InitiativeStatus slug={slug} />
      </div>
    </div>
  );
});

const Initiatives = wrapPage(() => {
  const slugs = useValue('meta.initiative/slugs');
  const makeBetter = "Let's make Aktopia better together.";
  const welcome =
    'Welcome to MetaAktopia. This is where Aktopia itself evolves to better serve communities. Dive in and have a say in its future.';
  return (
    <div className={'flex-col flex items-center gap-10'}>
      <h1 className={'text-4xl font-medium text-gray-800 text-center'}>{makeBetter}</h1>
      <p className={'text-gray-600 text-lg text-center md:w-2/3 px-2 h-full'}>{welcome}</p>
      <div className={'flex flex-col gap-9 w-full'}>
        {slugs.map((slug) => (
          <InitiativeCard key={slug} slug={slug} suspenseLines={2} />
        ))}
      </div>
    </div>
  );
});

export default Initiatives;
