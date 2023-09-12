import { Map } from '@elements/components/map';
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
import type { Location } from '@elements/logic/issue';

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

  const visible = useValue('issue.location.slide-over/visible');
  const onClose = useDispatch('issue.location.slide-over/close') as () => void;

  return (
    <SlideOver visible={visible} onClose={onClose}>
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

export const Locations = suspensify(({ refId }: Reference) => {
  const locations = useValue('issue/locations', { 'issue/id': refId });
  const center = useValue('issue.location.default/center', { 'issue/id': refId });
  const zoom = useValue('issue.location.default/zoom', { 'issue/id': refId });
  const newLocationCaption = useValue('issue.new.location/caption');

  const onViewListClick = useDispatch('issue.location.slide-over/open') as () => void;
  const onAddLocationClick = useDispatch('issue.location/add');
  const onUpdateCenter = useDispatch('issue.new.location.center/update');
  const onCaptionChange = useDispatch('issue.new.location.caption/update');

  return (
    <div>
      <Map
        center={center}
        locations={locations}
        newLocationCaption={newLocationCaption}
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
