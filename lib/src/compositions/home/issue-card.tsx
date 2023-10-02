import { suspensify } from '@elements/components/suspensify';
import { useValue } from '@elements/store/interface';
import { EntityType } from '@elements/compositions/entity-type';
import { EntityType as Type } from '@elements/types';
import { LastActive } from '@elements/compositions/last-active';
import { Voting } from '@elements/compositions/voting';
import { useTranslation } from '@elements/translation';
import { Locality as RawLocality } from '@elements/components/locality';
import { useCallback } from 'react';

interface IssueCardProps {
  id: string;
  onLocalitySlideOverOpen: (entityId: string, entityType: Type) => void;
}

const Locality = suspensify(({ issueId, onClick }: { issueId: string; onClick: () => void }) => {
  const t = useTranslation();
  const isLocalityChosen = useValue('issue.locality/exists', { 'issue/id': issueId });
  const localityName = useValue('issue.locality/name', { 'issue/id': issueId });

  return (
    <RawLocality
      isLocalityChosen={isLocalityChosen}
      localityName={localityName}
      notChosenText={t('issue.locality/add')}
      onClick={onClick}
    />
  );
});

export const IssueCard = suspensify(({ id, onLocalitySlideOverOpen }: IssueCardProps) => {
  const title = useValue('issue.title/text', { 'issue/id': id });
  const onLocalityClick = useCallback(
    () => onLocalitySlideOverOpen(id, Type.Issue),
    [id, onLocalitySlideOverOpen]
  );

  return (
    <div
      className={
        'flex w-full flex-col items-start justify-center gap-7 rounded-lg border border-gray-300 bg-white p-5 shadow-sm'
      }>
      <div className={'flex items-center gap-7'}>
        <EntityType size={'sm'} type={Type.Issue} />
        <LastActive entityId={id} />
        <Locality issueId={id} onClick={onLocalityClick} />
      </div>
      <a className={'text-lg font-medium hover:underline w-full'} href={`/issue/${id}`}>
        {title}
      </a>
      <div className={'flex items-center gap-5'}>
        <Voting refAttribute={'entity.type/issue'} refId={id} size={'xs'} suspenseLines={2} />
      </div>
    </div>
  );
});
