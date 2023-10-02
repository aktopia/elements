import { suspensify } from '@elements/components/suspensify';
import { useDispatch, useValue } from '@elements/store';
import { LocalitySlideOver as RawLocalitySlideOver } from '@elements/components/locality-slider-over';
import { useTranslation } from '@elements/translation';

export const ChooseLocalitySlideOver = suspensify(() => {
  const t = useTranslation();
  const visible = useValue('choose-locality.slide-over/visible');
  const chosenLocation = useValue('user.chosen.locality/location');
  const chosenZoom = useValue('user.chosen.locality/zoom');
  const onClose = useDispatch('choose-locality.slide-over/close') as () => void;
  const onDone = useDispatch('choose-locality.location/done');

  if (!visible) {
    return null;
  }

  const title = chosenLocation ? t('choose-locality/update') : t('choose-locality/add');

  return (
    <RawLocalitySlideOver
      initialCenter={chosenLocation}
      initialZoom={chosenZoom}
      title={title}
      visible={visible}
      onClose={onClose}
      onDone={onDone}
    />
  );
});
