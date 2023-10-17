import { suspensify } from '@elements/components/suspensify';
import { useValue } from '@elements/store/interface';
import { EntityTypeBadge } from '@elements/compositions/entity-type-badge';
import { EntityType as Type } from '@elements/types';
import { LastActive } from '@elements/compositions/last-active';
import { Voting } from '@elements/compositions/voting';
import { useTranslation } from '@elements/translation';
import { Locality as RawLocality } from '@elements/components/locality';
import { useCallback } from 'react';
import { Link } from '@elements/components/link';

interface ActionCardProps {
  id: string;
  onLocalitySlideOverOpen: (entityId: string, entityType: Type) => void;
}

export const Locality = suspensify(
  ({ actionId, onClick }: { actionId: string; onClick: () => void }) => {
    const t = useTranslation();
    const isLocalityChosen = useValue('action.locality/exists', { 'action/id': actionId });
    const localityName = useValue('action.locality/name', { 'action/id': actionId });

    return (
      <RawLocality
        isLocalityChosen={isLocalityChosen}
        localityName={localityName}
        notChosenText={t('action.locality/add')}
        onClick={onClick}
      />
    );
  }
);

export const ActionCard = suspensify(({ id, onLocalitySlideOverOpen }: ActionCardProps) => {
  const title = useValue('action.title/text', { 'action/id': id });
  const onLocalityClick = useCallback(
    () => onLocalitySlideOverOpen(id, Type.Action),
    [id, onLocalitySlideOverOpen]
  );
  const updatedAt = useValue('action/updated-at', { 'action/id': id });

  return (
    <div
      className={
        'flex w-full flex-col items-start justify-center gap-7 rounded-lg border border-gray-300 bg-white p-5 shadow-sm'
      }>
      <div className={'flex items-center gap-7'}>
        <EntityTypeBadge size={'sm'} type={Type.Action} />
        <LastActive timestamp={updatedAt} />
        <Locality actionId={id} onClick={onLocalityClick} />
      </div>
      <Link className={'text-2xl font-medium hover:underline w-full'} href={`/action/${id}`}>
        {title}
      </Link>
      <div className={'flex items-center gap-5'}>
        <Voting lookupRef={id} size={'xs'} suspenseLines={2} />
      </div>
    </div>
  );
});

/*
TODO
- Enable locality
- Add choose locality
 */
