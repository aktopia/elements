import { suspensify } from '@elements/components/suspensify';
import { useCallback, useRef, useState } from 'react';
import {
  SlideOver,
  SlideOverBody,
  SlideOverCloseButton,
  SlideOverFooter,
  SlideOverHeader,
  SlideOverTitle,
} from '@elements/components/slide-over';
import { useDispatch, useValue } from '@elements/store';
import { AddLocationPin, Map } from '@elements/components/map/map';
import type { LatLng, MapHandle } from '@elements/components/map/map';
import { SearchLocation } from '@elements/compositions/map';
import type { Place } from '@elements/compositions/map';

export const ChooseLocalitySlideOver = suspensify(() => {
  const mapRef = useRef<MapHandle>(null);
  const [dragging, setDragging] = useState(false);
  const visible = useValue('choose-locality.slide-over/visible');
  const chosenLocation = useValue('user.chosen.locality/location');
  const onClose = useDispatch('choose-locality.slide-over/close') as () => void;
  const updateLocation = useDispatch('choose-locality.location/update');
  const onDone = useDispatch('choose-locality.location/done');

  const onDragStart = useCallback(() => {
    setDragging(true);
  }, []);

  const onDragEnd = useCallback(
    ({ center }: { center: LatLng }) => {
      setDragging(false);
      updateLocation({ location: center });
    },
    [updateLocation]
  );

  const onTilesLoaded = useCallback(
    ({ center }: { center: LatLng }) => {
      updateLocation({ location: center });
    },
    [updateLocation]
  );

  const onSelect = useCallback(
    (place: Place) => {
      mapRef.current?.updateCenter({
        center: place.location,
        bounds: place.bounds,
      });
      updateLocation({ location: place.location });
    },
    [updateLocation]
  );

  console.log(visible);

  if (!visible) {
    return null;
  }

  return (
    <SlideOver visible={visible} onClose={onClose}>
      <div className={'relative flex h-full flex-col justify-between'}>
        <div>
          <SlideOverHeader>
            <SlideOverTitle title={'Choose Locality'} />
            <SlideOverCloseButton onClick={onClose} />
          </SlideOverHeader>
          <SlideOverBody>
            <div className={'flex h-fit items-center gap-5'}>
              <div className={'relative h-[25rem] w-full overflow-hidden rounded-lg shadow'}>
                <Map
                  ref={mapRef}
                  initialCenter={chosenLocation}
                  onDragEnd={onDragEnd}
                  onDragStart={onDragStart}
                  onTilesLoaded={onTilesLoaded}
                />
                <div className={'absolute top-3 left-0 right-0 mx-auto w-4/5'}>
                  <SearchLocation onSelect={onSelect} />
                </div>
                <AddLocationPin dragging={dragging} />
              </div>
            </div>
          </SlideOverBody>
        </div>
        <div className={'sticky bottom-0 w-full'}>
          <SlideOverFooter
            actionText={'Done'}
            cancelText={'Cancel'}
            onAction={onDone}
            onCancel={onClose}
          />
        </div>
      </div>
    </SlideOver>
  );
});
