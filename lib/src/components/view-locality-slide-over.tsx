import { suspensify } from '@elements/components/suspensify';
import {
  SlideOver,
  SlideOverBody,
  SlideOverCloseButton,
  SlideOverHeader,
  SlideOverTitle,
} from '@elements/components/slide-over';
import { type LatLng, Map } from '@elements/components/map';

interface ViewLocalitySlideOverProps {
  initialCenter?: LatLng;
  initialZoom?: number;
  locations: LatLng[];
  onClose: () => void;
  title: string;
  visible: boolean;
}

export const ViewLocalitySlideOver = suspensify(
  ({
    visible,
    initialCenter,
    initialZoom,
    locations,
    onClose,
    title,
  }: ViewLocalitySlideOverProps) => {
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
                <div className={'relative h-[25rem] w-[400px] overflow-hidden rounded-lg shadow'}>
                  <Map
                    initialCenter={initialCenter}
                    initialZoom={initialZoom}
                    locations={locations}
                  />
                </div>
              </div>
            </SlideOverBody>
          </div>
        </div>
      </SlideOver>
    );
  }
);
