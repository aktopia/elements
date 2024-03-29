import type { LatLng, LatLngBounds, MapHandle } from '@elements/components/map';
import { AddLocationPin, Map } from '@elements/components/map';
import {
  SlideOver,
  SlideOverBody,
  SlideOverCloseButton,
  SlideOverHeader,
  SlideOverTitle,
} from '@elements/components/slide-over';
import { suspensify } from '@elements/components/suspensify';
import { useDispatch, useValue } from '@elements/store/interface';
import { useTranslation } from '@elements/translation';
import type { Location } from '@elements/logic/issue';
import { ListBulletOutline, MapPinSolid, TrashOutline } from '@elements/icons';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Button } from '@elements/components/button';
import { type Place, SearchLocation } from '@elements/compositions/map';
import { Avatar } from '@elements/components/avatar';
import { Timestamp } from '@elements/components/timestamp';
import { ContextMenu } from '@elements/components/context-menu';
import type { ItemType } from '@elements/components/dropdown';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useWrapRequireAuth } from '@elements/store/hooks';

interface LocationCardProps {
  locationId: string;
  setMapCenter: ({ center, bounds }: { center: LatLng; bounds: LatLngBounds }) => void;
}

const LocationCard = suspensify(({ locationId, setMapCenter }: LocationCardProps) => {
  const t = useTranslation();
  const creatorName = useValue('location.created-by/name', { 'location/id': locationId });
  const createdAt = useValue('location/created-at', { 'location/id': locationId });
  // const address = useValue('location/address', { 'location/id': locationId });
  const caption = useValue('location/caption', { 'location/id': locationId });
  const latLng = useValue('location/lat-lng', { 'location/id': locationId });
  const bounds = useValue('location/bounds', { 'location/id': locationId });

  const deleteLocation = useDispatch('issue.location/delete');

  const openModal = useDispatch('confirmation-modal/open');

  const onSetMapCenter = useCallback(() => {
    setMapCenter({ center: latLng, bounds });
  }, [latLng, setMapCenter, bounds]);

  const onDeleteClick = useCallback(() => {
    const onConfirm = async () => deleteLocation({ 'location/id': locationId });
    openModal({
      kind: 'danger',
      confirmText: t('common/delete'),
      titleText: t('location.delete.modal/title'),
      bodyText: t('location.delete.modal/body'),
      cancelText: t('common/cancel'),
      onConfirm,
    });
  }, [locationId, openModal, t, deleteLocation]);

  const menuItems = useMemo(
    () => [
      {
        text: t('common/delete'),
        onClick: onDeleteClick,
        Icon: TrashOutline,
        kind: 'danger',
        type: 'button',
        key: 'delete',
      },
    ],
    [t, onDeleteClick]
  ) as ItemType[];

  return (
    <div
      className={
        'flex md:w-[400px] w-full flex-col items-start gap-3 rounded-md border border-gray-300 px-3 py-2 shadow-sm'
      }>
      <div className={'flex w-full items-center gap-5'}>
        <div className={'flex items-center gap-2'}>
          <Avatar size={'xs'} />
          <p className={'text-sm font-medium text-gray-700'}>{creatorName}</p>
        </div>
        <Timestamp className={'text-xs text-gray-500'} timestamp={createdAt} />
      </div>
      <button
        className={'w-full text-left text-base text-gray-700'}
        type={'button'}
        onClick={onSetMapCenter}>
        {caption}
      </button>
      {/*<p className={'text-sm text-gray-500'}>{address}</p>*/}
      <ContextMenu items={menuItems} orientation={'horizontal'} />
    </div>
  );
});

interface SlideOverProps {
  locations: Location[];
  setMapCenter: ({ center, bounds }: { center: LatLng; bounds: LatLngBounds }) => void;
}

const LocationsListSlideOver = suspensify(({ locations, setMapCenter }: SlideOverProps) => {
  const t = useTranslation();

  const visible = useValue('issue.location.slide-over/visible');
  const onClose = useDispatch('issue.location.slide-over/close') as () => void;

  const emptyLocations = locations.length === 0;

  return (
    <SlideOver visible={visible} onClose={onClose}>
      <SlideOverHeader>
        <SlideOverTitle title={t('issue.spots.slide-over/list')} />
        <SlideOverCloseButton onClick={onClose} />
      </SlideOverHeader>
      <SlideOverBody>
        {emptyLocations ? (
          <p className={'md:w-[400px] w-full text-center text-gray-400'}>
            {t('issue.spots.slide-over/empty')}
          </p>
        ) : (
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
        )}
      </SlideOverBody>
    </SlideOver>
  );
});

const ViewList = ({ onClick }: { onClick: () => void }) => {
  const text = 'List Spots';
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
  const text = 'Add Spot';
  return show ? (
    <Button Icon={MapPinSolid} kind={'primary'} size={'sm'} value={text} onClick={onClick} />
  ) : null;
};

const AddLocation = ({
  onAdd,
  onCancel,
  show,
}: {
  onAdd: ({ caption }: { caption: string }) => void;
  onCancel: () => void;
  show: boolean;
}) => {
  const t = useTranslation();

  const { register, handleSubmit: onSubmit, reset } = useForm<{ caption: string }>();

  const submit: SubmitHandler<{ caption: string }> = ({ caption }) => {
    onAdd({ caption });
    reset();
  };

  const onCancel_ = useCallback(() => {
    reset();
    onCancel();
  }, [onCancel, reset]);

  return show ? (
    <form className={'flex md:w-2/3 w-full gap-3 items-center'} onSubmit={onSubmit(submit)}>
      <input
        className={
          'grow rounded-md border-none text-gray-600 placeholder-gray-400 bg-gray-100 py-1.5 px-2'
        }
        placeholder={'A caption to identify the spot'}
        type={'text'}
        {...register('caption', { required: true })}
      />
      <div className={'flex gap-2'}>
        <Button kind={'success'} size={'sm'} type={'submit'} value={t('common/add')} />
        <Button kind={'tertiary'} size={'sm'} value={t('common/cancel')} onClick={onCancel_} />
      </div>
    </form>
  ) : null;
};

export const Spots = suspensify(({ refId }: { refId: string }) => {
  const mapRef = useRef<MapHandle>(null);
  const [addingLocation, setAddingLocation] = useState(false);
  const [dragging, setDragging] = useState(false);

  const locations = useValue('issue/locations', { 'issue/id': refId });
  const center = useValue('user.locality/location');
  const zoom = useValue('user.locality/zoom');

  const onViewListClick = useDispatch('issue.location.slide-over/open') as () => void;
  const onAddLocation = useDispatch('issue.location/add');
  const onStartAddingLocation = useWrapRequireAuth(() => {
    setAddingLocation(true);
  }, []);

  const onDragStart = useCallback(() => {
    setDragging(true);
  }, []);

  const onDragEnd = useCallback(() => {
    setDragging(false);
  }, []);

  const onCancelAddingLocation = useCallback(() => {
    setAddingLocation(false);
  }, []);

  const onConfirmLocation = useCallback(
    ({ caption }: { caption: string }) => {
      setAddingLocation(false);
      const center = mapRef.current?.getCenter();
      const bounds = mapRef.current?.getBounds();
      center && onAddLocation({ location: center, bounds, caption });
    },
    [onAddLocation]
  );

  const onSelect = useCallback((place: Place) => {
    mapRef.current?.setCenter({
      center: place.location,
      bounds: place.bounds,
    });
  }, []);

  const setMapCenter = useCallback(
    ({ center, bounds }: { center: LatLng; bounds: LatLngBounds }) => {
      mapRef.current?.setCenter({ center, bounds });
    },
    []
  );

  return (
    <div className={'flex flex-col gap-8'}>
      <div className={'flex justify-between flex-wrap gap-4'}>
        <ViewList onClick={onViewListClick} />
        <StartAddLocation show={!addingLocation} onClick={onStartAddingLocation} />
        <AddLocation
          show={addingLocation}
          onAdd={onConfirmLocation}
          onCancel={onCancelAddingLocation}
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
