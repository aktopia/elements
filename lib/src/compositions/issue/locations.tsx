import { Map } from '@elements/components/map';
import { LatLng } from '@elements/components/map/map';
import {
  SlideOver,
  SlideOverBody,
  SlideOverCloseButton,
  SlideOverHeader,
  SlideOverTitle,
} from '@elements/components/slide-over';
import { suspensify } from '@elements/components/suspensify';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { useMemo } from 'react';

interface Location extends LatLng {
  id: string;
  caption: string;
}

/* TODO
- On hover should hover the marker
- Add locate icon which when clicked will zoom in on the selected location


 */
const LocationCard = suspensify(({ location }: { location: Location }) => {
  return (
    <p
      className={
        'rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 shadow'
      }>
      {location.caption}
    </p>
  );
});

const LocationsListSlideOver = suspensify(({ locations }: { locations: Location[] }) => {
  const t = useTranslation();

  const visible = useValue<boolean>('issue.location.slide-over/visible');
  const onClose = useDispatch('issue.location.slide-over/close', { emptyParams: true });

  return (
    <SlideOver visible={visible}>
      <SlideOverHeader>
        <SlideOverTitle title={t('issue.location.slide-over/location-list')} />
        <SlideOverCloseButton onClick={onClose} />
      </SlideOverHeader>
      <SlideOverBody>
        <div className={'flex flex-col gap-5'}>
          {locations.map((location) => (
            <LocationCard key={location.id} location={location} suspenseLines={8} />
          ))}
        </div>
      </SlideOverBody>
    </SlideOver>
  );
});

interface Reference {
  refId: string;
  refAttribute: string;
}

export const Locations = suspensify(({ refId, refAttribute }: Reference) => {
  const reference = useMemo(
    () => ({ 'ref/id': refId, 'ref/attribute': refAttribute }),
    [refId, refAttribute]
  );
  const locations = useValue<Location[]>('location/data', reference);
  const center = useValue<LatLng>('issue.location/center', reference);
  const zoom = useValue<number>('issue.location/zoom', reference);

  const onViewListClick = useDispatch('issue.location.slide-over/open', { emptyParams: true });
  const onAddLocationClick = useDispatch('issue.location/add');
  const onUpdateCenter = useDispatch('issue.location.center/update');
  const onCaptionChange = useDispatch('issue.location.caption/update');

  return (
    <div>
      <Map
        center={center}
        locations={locations}
        zoom={zoom}
        onAddLocation={onAddLocationClick}
        onCaptionChange={onCaptionChange}
        onUpdateCenter={onUpdateCenter}
        onViewListClick={onViewListClick}
      />
      <LocationsListSlideOver locations={locations} suspenseLines={8} />
    </div>
  );
});
