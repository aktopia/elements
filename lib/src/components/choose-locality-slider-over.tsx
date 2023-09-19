import { useCallback, useRef, useState } from 'react';
import {
  SlideOver,
  SlideOverBody,
  SlideOverCloseButton,
  SlideOverFooter,
  SlideOverHeader,
  SlideOverTitle,
} from '@elements/components/slide-over';
import type { LatLng, MapHandle } from '@elements/components/map';
import { AddLocationPin, Map } from '@elements/components/map';
import type { Place } from '@elements/compositions/map';
import { SearchLocation } from '@elements/compositions/map';

interface ChooseLocalitySlideOverProps {
  visible: boolean;
  title: string;
  initialCenter?: LatLng;
  initialZoom?: number;
  onClose: () => void;
  onDone: ({ location, zoom }: { location: LatLng; zoom: number }) => void;
}

export const ChooseLocalitySlideOver = ({
  visible,
  initialCenter,
  initialZoom,
  title,
  onClose,
  onDone,
}: ChooseLocalitySlideOverProps) => {
  const mapRef = useRef<MapHandle>(null);
  const [dragging, setDragging] = useState(false);

  const onDragStart = useCallback(() => {
    setDragging(true);
  }, []);

  const onDragEnd = useCallback(() => {
    setDragging(false);
  }, []);

  const onSelect = useCallback((place: Place) => {
    mapRef.current?.setCenter({
      center: place.location,
      bounds: place.bounds,
    });
  }, []);

  const onAction = useCallback(() => {
    const center = mapRef.current?.getCenter();
    const zoom = mapRef.current?.getZoom();
    center && zoom && onDone({ location: center, zoom });
  }, [onDone]);

  if (!visible) {
    return null;
  }

  return (
    <SlideOver visible={visible} onClose={onClose}>
      <div className={'relative flex h-full flex-col justify-between'}>
        <div>
          <SlideOverHeader>
            <SlideOverTitle title={title} />
            <SlideOverCloseButton onClick={onClose} />
          </SlideOverHeader>
          <SlideOverBody>
            <div className={'flex h-fit items-center gap-5'}>
              <div className={'relative h-[25rem] w-full overflow-hidden rounded-lg shadow'}>
                <Map
                  ref={mapRef}
                  initialCenter={initialCenter}
                  initialZoom={initialZoom}
                  onDragEnd={onDragEnd}
                  onDragStart={onDragStart}
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
            onAction={onAction}
            onCancel={onClose}
          />
        </div>
      </div>
    </SlideOver>
  );
};
