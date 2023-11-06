import { suspensify } from '@elements/components/suspensify';
import { useDispatch, useValue } from '@elements/store';
import { ChooseLocalitySlideOver as RawChooseLocalitySlideOver } from '@elements/components/choose-locality-slider-over';
import { useTranslation } from '@elements/translation';

export const ChooseLocalitySlideOver = suspensify(() => {
  const t = useTranslation();
  const visible = useValue('choose-locality.slide-over/visible');
  const apparentLocation = useValue('user.apparent.locality/location');
  const chosenLocation = useValue('user.chosen.locality/location');
  const initialCenter = chosenLocation || apparentLocation;
  const chosenZoom = useValue('user.chosen.locality/zoom');
  const initialZoom = chosenZoom || 10;
  const onClose = useDispatch('choose-locality.slide-over/close') as () => void;
  const onDone = useDispatch('choose-locality.location/done');

  if (!visible) {
    return null;
  }

  const title = chosenLocation ? t('choose-locality/update') : t('choose-locality/add');

  return (
    <RawChooseLocalitySlideOver
      description={t('choose-locality/description')}
      initialCenter={initialCenter}
      initialZoom={initialZoom}
      title={title}
      visible={visible}
      onClose={onClose}
      onDone={onDone}
    />
  );
});
