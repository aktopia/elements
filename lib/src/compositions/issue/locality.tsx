import { suspensify } from '@elements/components/suspensify';
import { useTranslation } from '@elements/translation';
import { useDispatch, useValue } from '@elements/store/interface';
import { Locality as RawLocality } from '@elements/components/locality';
import { LocalitySlideOver as RawLocalitySlideOver } from '@elements/components/locality-slider-over';

export const LocalitySlideOver = suspensify(({ issueId }: { issueId: string }) => {
  const t = useTranslation();
  const visible = useValue('issue.locality.slide-over/visible');
  const location = useValue('issue.locality/location', { 'issue/id': issueId });
  const zoom = useValue('issue.locality/zoom', { 'issue/id': issueId });
  const onClose = useDispatch('issue.locality.slide-over/close') as () => void;
  const onDone = useDispatch('issue.locality/choose');

  if (!visible) {
    return null;
  }

  const title = location ? t('issue.locality/update') : t('issue.locality/add');

  return (
    <RawLocalitySlideOver
      initialCenter={location}
      initialZoom={zoom}
      title={title}
      visible={visible}
      onClose={onClose}
      onDone={onDone}
    />
  );
});

export const Locality = suspensify(({ issueId }: { issueId: string }) => {
  const t = useTranslation();
  const isLocalityChosen = useValue('issue.locality/exists', { 'issue/id': issueId });
  const localityName = useValue('issue.locality/name', { 'issue/id': issueId });
  const onOpen = useDispatch('issue.locality.slide-over/open') as () => void;

  return (
    <RawLocality
      isLocalityChosen={isLocalityChosen}
      localityName={localityName}
      notChosenText={t('issue.locality/add')}
      onClick={onOpen}
    />
  );
});
