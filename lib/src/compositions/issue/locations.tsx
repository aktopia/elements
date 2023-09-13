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
import { ListBulletOutline, MapPinOutline, MapPinSolid, PlusSolid } from '@elements/icons';
import React, { useCallback, useState } from 'react';
import { AddLocationPin, SearchLocation } from '@elements/components/map/map';
import { fetchPredictions } from '@elements/utils/location';
import { Button } from '@elements/components/button';

interface Reference {
  refId: string;
  refAttribute: string;
}

const LocationCard = suspensify(({ location }: { location: Location }) => {
  /* TODO
                                                                                                                            - On hover should hover the marker
                                                                                                                            - Add locate icon which when clicked will zoom in on the selected location
                                                                                                                             */
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

const ViewList = ({ onClick }: { onClick: () => void }) => {
  const text = 'Locations List';
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

const AddLocationIcon = () => {
  return (
    <div className={'relative'}>
      <MapPinOutline className={'h-5 w-5 text-gray-500 group-hover:text-gray-700'} />
      <PlusSolid
        className={
          'ring-px absolute -bottom-1 right-1 block h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 transform rounded-full bg-white text-gray-500 ring-white group-hover:bg-gray-50 group-hover:text-gray-700 group-hover:ring-gray-50'
        }
      />
    </div>
  );
};

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

const autoCompleteOptions = [];

export const Locations = suspensify(({ refId }: Reference) => {
  const [addingLocation, setAddingLocation] = useState(false);

  const locations = useValue('issue/locations', { 'issue/id': refId });
  const center = useValue('issue.location.default/center', { 'issue/id': refId });
  const zoom = useValue('issue.location.default/zoom', { 'issue/id': refId });
  const newLocationCaption = useValue('issue.new.location/caption');

  const [dragging, setDragging] = useState(false);

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
      console.log(center);
      setDragging(false);
      onUpdateCenter && onUpdateCenter({ center });
    },
    [onUpdateCenter]
  );

  const onCancelAddingLocation = useCallback(() => {
    setAddingLocation(false);
    // setAutoCompleteOptions([]);
  }, []);

  const onConfirmLocation = useCallback(() => {
    setAddingLocation(false);
    // setAutoCompleteOptions([]);
    onAddLocation({});
  }, [onAddLocation]);

  const onTilesLoaded = useCallback(
    ({ center }: any) => {
      onUpdateCenter && onUpdateCenter({ center });
    },
    [onUpdateCenter]
  );

  const onSearch = useCallback(async (q: string) => {
    const predictions = await fetchPredictions(q);
    // setAutoCompleteOptions(predictions);
  }, []);

  const onPlaceSelect = useCallback(
    (place: any) => {
      // fetchPlaceDetails(
      //   place,
      //   placesService.current,
      //   ({ center, bounds }: { center: LatLng; bounds: any }) => {
      //     onUpdateCenter({ center });
      //     map?.setCenter(center);
      //     map?.fitBounds(bounds);
      //   }
      // );
      // setAutoCompleteOptions([]);
    },
    [onUpdateCenter]
  );

  return (
    <div className={'flex flex-col gap-5'}>
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
      <div className={'relative h-[40rem] w-full overflow-hidden rounded-lg shadow'}>
        <Map
          center={center}
          locations={locations}
          zoom={zoom}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
          onTilesLoaded={onTilesLoaded}
        />

        <SearchLocation
          options={autoCompleteOptions}
          show={addingLocation}
          onChange={onSearch}
          onSelect={onPlaceSelect}
        />
        <AddLocationPin dragging={dragging} show={addingLocation} />
      </div>
      <LocationsListSlideOver locations={locations} suspenseLines={8} />
    </div>
  );
});
