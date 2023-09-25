import type { LatLng, MapHandle } from '@elements/components/map';
import { AddLocationPin, Map } from '@elements/components/map';
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
import { ListBulletOutline, MapPinSolid } from '@elements/icons';
import React, { useCallback, useRef, useState } from 'react';
import { Button } from '@elements/components/button';
import { type Place, SearchLocation } from '@elements/compositions/map';
import { Avatar } from '@elements/components/avatar';
import { Timestamp } from '@elements/components/timestamp';

/*
TODO
  - On hover should hover the marker
  - Add locate icon which when clicked will zoom in on the selected location
*/

interface LocationCardProps {
  locationId: string;
  setMapCenter: (center: LatLng) => void;
}

const LocationCard = suspensify(({ locationId, setMapCenter }: LocationCardProps) => {
  const creatorName = useValue('location.created-by/name', { 'location/id': locationId });
  const createdAt = useValue('location/created-at', { 'location/id': locationId });
  const address = useValue('location/address', { 'location/id': locationId });
  const caption = useValue('location/caption', { 'location/id': locationId });
  const latLng = useValue('location/lat-lng', { 'location/id': locationId });

  const onSetMapCenter = useCallback(() => {
    setMapCenter(latLng);
  }, [latLng, setMapCenter]);

  return (
    <div
      className={
        'flex w-[400px] flex-col items-start gap-3 rounded-md border border-gray-300 px-3 py-2 shadow-sm'
      }>
      <div className={'flex justify-between'}>
        <div className={'flex items-center gap-2'}>
          <Avatar size={'xs'} />
          <p className={'text-sm font-medium text-gray-700'}>{creatorName}</p>
        </div>
        <Timestamp className={'text-xs text-gray-500'} timestamp={createdAt} />
      </div>
      <button className={'text-base text-gray-700'} type={'button'} onClick={onSetMapCenter}>
        {caption}
      </button>
      <p className={'text-sm text-gray-500'}>{address}</p>
    </div>
  );
});

interface SlideOverProps {
  locations: Location[];
  setMapCenter: (center: LatLng) => void;
}

const LocationsListSlideOver = suspensify(({ locations, setMapCenter }: SlideOverProps) => {
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
        <div className={'flex flex-col gap-7'}>
          {locations.map((location) => (
            <LocationCard
              key={location.id}
              locationId={location.id}
              setMapCenter={setMapCenter}
              suspenseLines={8}
            />
          ))}
        </div>
      </SlideOverBody>
    </SlideOver>
  );
});

const ViewList = ({ onClick }: { onClick: () => void }) => {
  const text = 'List Locations';
  return (
    <Button
      Icon={ListBulletOutline}
      kind={'secondary'}
      size={'sm'}
      value={text}
      onClick={onClick}
    />
  );
};

const StartAddLocation = ({ show, onClick }: { onClick: () => void; show: boolean }) => {
  const text = 'Add Location';
  return show ? (
    <Button Icon={MapPinSolid} kind={'primary'} size={'sm'} value={text} onClick={onClick} />
  ) : null;
};

// const AddLocationIcon = () => {
//   return (
//     <div className={'relative'}>
//       <MapPinOutline className={'h-5 w-5 text-gray-500 group-hover:text-gray-700'} />
//       <PlusSolid
//         className={
//           'ring-px absolute -bottom-1 right-1 block h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 transform rounded-full bg-white text-gray-500 ring-white group-hover:bg-gray-50 group-hover:text-gray-700 group-hover:ring-gray-50'
//         }
//       />
//     </div>
//   );
// };

const AddLocation = ({
  onAdd,
  onCancel,
  onCaptionChange,
  caption,
  show,
}: {
  onAdd: () => void;
  onCancel: () => void;
  onCaptionChange: ({ caption }: { caption: string }) => void;
  caption: string;
  show: boolean;
}) => {
  // TODO Validate caption required and length
  const confirmText = 'Add';
  const cancelText = 'Cancel';

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onCaptionChange({ caption: e.target.value });
    },
    [onCaptionChange]
  );

  return show ? (
    <div className={'flex w-2/3 gap-3'}>
      <input
        className={
          'grow rounded-md border border-gray-100 text-gray-600 placeholder-gray-400 shadow-xl'
        }
        placeholder={'A caption to identify the location'}
        type={'text'}
        value={caption}
        onChange={onChange}
      />
      <div className={'flex gap-2'}>
        <Button kind={'success'} size={'sm'} value={confirmText} onClick={onAdd} />
        <Button kind={'tertiary'} size={'sm'} value={cancelText} onClick={onCancel} />
      </div>
    </div>
  ) : null;
};

export const Locations = suspensify(({ refId }: { refId: string }) => {
  const mapRef = useRef<MapHandle>(null);
  const [addingLocation, setAddingLocation] = useState(false);
  const [dragging, setDragging] = useState(false);

  const locations = useValue('issue/locations', { 'issue/id': refId });
  const center = useValue('issue.location.default/center', { 'issue/id': refId });
  const zoom = useValue('issue.location.default/zoom', { 'issue/id': refId });
  const newLocationCaption = useValue('issue.new.location/caption');

  const onViewListClick = useDispatch('issue.location.slide-over/open') as () => void;
  const onAddLocation = useDispatch('issue.location/add');
  const onUpdateCenter = useDispatch('issue.new.location.center/update');
  const onCaptionChange = useDispatch('issue.new.location.caption/update');

  const onStartAddingLocation = useCallback(() => {
    setAddingLocation(true);
  }, []);

  const onDragStart = useCallback(() => {
    setDragging(true);
  }, []);

  const onDragEnd = useCallback(
    ({ center }: any) => {
      setDragging(false);
      onUpdateCenter({ center });
    },
    [onUpdateCenter]
  );

  const onTilesLoaded = useCallback(
    ({ center }: any) => {
      onUpdateCenter({ center });
    },
    [onUpdateCenter]
  );

  const onCancelAddingLocation = useCallback(() => {
    setAddingLocation(false);
  }, []);

  const onConfirmLocation = useCallback(() => {
    setAddingLocation(false);
    onAddLocation({});
  }, [onAddLocation]);

  const onSelect = useCallback(
    (place: Place) => {
      mapRef.current?.setCenter({
        center: place.location,
        bounds: place.bounds,
      });
      onUpdateCenter({ center: place.location });
    },
    [onUpdateCenter]
  );

  const setMapCenter = useCallback((center: LatLng) => {
    mapRef.current?.setCenter({ center });
  }, []);

  return (
    <div className={'flex flex-col gap-8'}>
      <div className={'flex justify-between'}>
        <ViewList onClick={onViewListClick} />
        <StartAddLocation show={!addingLocation} onClick={onStartAddingLocation} />
        <AddLocation
          caption={newLocationCaption}
          show={addingLocation}
          onAdd={onConfirmLocation}
          onCancel={onCancelAddingLocation}
          onCaptionChange={onCaptionChange}
        />
      </div>
      <div className={'relative h-screen w-full overflow-hidden rounded-lg shadow'}>
        <Map
          ref={mapRef}
          initialCenter={center}
          initialZoom={zoom}
          locations={locations}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
          onTilesLoaded={onTilesLoaded}
        />
        {addingLocation && (
          <>
            <div className={'absolute top-3 left-0 right-0 mx-auto w-2/5'}>
              <SearchLocation onSelect={onSelect} />
            </div>
            <AddLocationPin dragging={dragging} />
          </>
        )}
      </div>
      <LocationsListSlideOver locations={locations} setMapCenter={setMapCenter} suspenseLines={8} />
    </div>
  );
});
