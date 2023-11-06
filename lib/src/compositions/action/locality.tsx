import { suspensify } from '@elements/components/suspensify';
import { useTranslation } from '@elements/translation';
import { useDispatch, useValue } from '@elements/store/interface';
import { Locality as RawLocality } from '@elements/components/locality';
import { ChooseLocalitySlideOver as RawChooseLocalitySlideOver } from '@elements/components/choose-locality-slider-over';

export const LocalitySlideOver = suspensify(({ actionId }: { actionId: string }) => {
  const t = useTranslation();
  const visible = useValue('action.locality.slide-over/visible');
  const location = useValue('action.locality/location', { 'action/id': actionId });
  const userLocation = useValue('user.locality/location');
  const zoom = useValue('action.locality/zoom', { 'action/id': actionId });
  const onClose = useDispatch('action.locality.slide-over/close') as () => void;
  const onDone = useDispatch('action.locality/choose');

  if (!visible) {
    return null;
  }

  const title = location ? t('action.locality/update') : t('action.locality/add');

  return (
    <RawChooseLocalitySlideOver
      initialCenter={location || userLocation}
      initialZoom={zoom || 13}
      title={title}
      visible={visible}
      onClose={onClose}
      onDone={onDone}
    />
  );
});

export const Locality = suspensify(({ actionId }: { actionId: string }) => {
  const t = useTranslation();
  const isLocalityChosen = useValue('action.locality/exists', { 'action/id': actionId });
  const localityName = useValue('action.locality/name', { 'action/id': actionId });
  const onOpen = useDispatch('action.locality.slide-over/open') as () => void;

  return (
    <RawLocality
      isLocalityChosen={isLocalityChosen}
      localityName={localityName}
      notChosenText={t('action.locality/add')}
      onClick={onOpen}
    />
  );
});
