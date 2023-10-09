import { suspensify } from '@elements/components/suspensify';
import { useValue } from '@elements/store/interface';
import { EntityType } from '@elements/compositions/entity-type';
import { EntityType as Type } from '@elements/types';
import { LastActive } from '@elements/compositions/last-active';
import { Voting } from '@elements/compositions/voting';
import { useTranslation } from '@elements/translation';
import { Locality as RawLocality } from '@elements/components/locality';
import { useCallback } from 'react';
import { Link } from '@elements/components/link';

interface IssueCardProps {
  id: string;
  onLocalitySlideOverOpen: (entityId: string) => void;
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

const Facing = ({ issueId }: { issueId: string }) => {
  const t = useTranslation();
  const count = useValue('issue.users.facing/count', { 'issue/id': issueId });

  return (
    <div className={'flex gap-2 items-center'}>
      <p className={'text-sm font-medium text-gray-600'}>{count}</p>
      <p className={'text-sm text-gray-500'}>{t('issue/facing')}</p>
    </div>
  );
};

const Severity = ({ issueId }: { issueId: string }) => {
  const t = useTranslation();
  const severity = useValue('issue.severity/score', { 'issue/id': issueId });

  return (
    <div className={'flex gap-2 items-center'}>
      <p className={'text-sm text-gray-500'}>{t('issue/severity')}</p>
      <p className={'text-sm font-medium text-gray-600'}>{severity}</p>
    </div>
  );
};

export const IssueCard = suspensify(({ id, onLocalitySlideOverOpen }: IssueCardProps) => {
  const title = useValue('issue.title/text', { 'issue/id': id });
  const updatedAt = useValue('issue/updated-at', { 'issue/id': id });

  const onLocalityClick = useCallback(
    () => onLocalitySlideOverOpen(id),
    [id, onLocalitySlideOverOpen]
  );

  return (
    <div
      className={
        'flex w-full flex-col items-start justify-center gap-7 rounded-lg border border-gray-300 bg-white p-5 shadow-sm'
      }>
      <div className={'flex items-center gap-7'}>
        <EntityType size={'sm'} type={Type.Issue} />
        <LastActive timestamp={updatedAt} />
        <Locality issueId={id} onClick={onLocalityClick} />
      </div>
      <Link className={'text-xl font-medium hover:underline w-full'} href={`/issue/${id}`}>
        {title}
      </Link>
      <div className={'flex items-center gap-10'}>
        <Voting refAttribute={'entity.type/issue'} refId={id} size={'sm'} suspenseLines={2} />
        <Facing issueId={id} />
        <Severity issueId={id} />
      </div>
    </div>
  );
});
