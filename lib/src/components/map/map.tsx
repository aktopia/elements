import {
  ArrowPathOutline,
  CheckSolid,
  MapPinOutline,
  MapPinSolid,
  PlusSolid,
  XMarkSolid,
} from '@elements/_icons';
import { Select } from '@elements/components/map/select';
import {
  calculateBounds,
  fetchPlaceDetails,
  fetchPredictions,
  getCenter,
} from '@elements/components/map/utils';
import { Spinner } from '@elements/components/spinner';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { cx } from 'cva';
import { differenceWith, isEmpty, isEqual } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import LatLngLiteral = google.maps.LatLngLiteral;
import AutocompleteService = google.maps.places.AutocompleteService;
import PlacesService = google.maps.places.PlacesService;

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

interface MapProps {
  center?: LatLngLiteral;
  locations?: LatLngLiteral[];
  zoom?: number;
  addLocation: (center: LatLngLiteral) => void;
  updateCenter: (center: LatLngLiteral) => void;
}

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <Spinner size={'sm'} visible={true} />;
    case Status.FAILURE:
      return <h3>{status}</h3>;
    case Status.SUCCESS:
      return <CheckSolid className={'h-5 w-5 text-green-500'} />;
  }
};

const ResetLocation = ({ onClick }: { onClick: any }) => {
  return (
    <button
      className={
        'ahover:hover:bg-stone-50 group absolute bottom-10 left-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-stone-50 bg-white text-stone-600 shadow-xl'
      }
      type={'button'}
      onClick={onClick}>
      <ArrowPathOutline className={'ahover:group-hover:text-stone-800 h-7 w-7 text-stone-500'} />
    </button>
  );
};

const ConfirmAddLocation = ({ onClick, show }: { onClick: () => void; show: boolean }) => {
  const confirmText = 'Confirm Location';
  return show ? (
    <button
      className={
        'absolute bottom-11 flex items-center justify-center space-x-2 rounded-full border border-stone-50 bg-white py-2 px-5 font-medium text-stone-500 shadow-xl hover:bg-stone-50 hover:text-stone-800'
      }
      type={'button'}
      onClick={onClick}>
      <CheckSolid className={'h-5 w-5'} />
      <p>{confirmText}</p>
    </button>
  ) : null;
};

const SearchLocation = ({
  options,
  onChange,
  show,
  onSelect,
}: {
  options: any[];
  onChange: (q: string) => void;
  show: boolean;
  onSelect: (place: any) => void;
}) => {
  return show ? (
    <div className={'absolute top-3 w-1/2'}>
      <Select options={options} onChange={onChange} onChoose={onSelect} />
    </div>
  ) : null;
};

const CancelAddLocation = ({ show, onClick }: { onClick: () => void; show: boolean }) => {
  return show ? (
    <button
      className={
        'ahover:hover:bg-stone-50 group absolute top-3.5 right-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-stone-50 bg-white text-stone-600 shadow-xl'
      }
      type={'button'}
      onClick={onClick}>
      <XMarkSolid className={'ahover:group-hover:text-stone-800 h-5 w-5 text-stone-500'} />
    </button>
  ) : null;
};

const StartAddLocation = ({ show, onClick }: { onClick: () => void; show: boolean }) => {
  return show ? (
    <button
      className={
        'ahover:hover:bg-stone-50 group absolute top-2 right-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-stone-50 bg-white shadow-xl'
      }
      type={'button'}
      onClick={onClick}>
      <MapPinOutline className={'ahover:group-hover:text-stone-700 h-9 w-9 text-stone-500'} />
      <PlusSolid
        className={
          'ahover:group-hover:text-stone-700 absolute bottom-0 right-2.5 block h-3 w-3 -translate-y-1/2 translate-x-1/2 transform rounded-full bg-white text-stone-500 ring-1 ring-white group-hover:bg-gray-50 group-hover:ring-stone-50'
        }
      />
    </button>
  ) : null;
};

const AddLocationPin = ({ dragging, show }: { dragging: boolean; show: boolean }) => {
  return show ? (
    <div className={'absolute flex items-center justify-center'}>
      <MapPinSolid
        className={cx(
          'absolute inline-block h-16 w-16 stroke-white stroke-[0.5px] text-rose-700 transition-all duration-150 ease-in-out ',
          dragging ? 'bottom-9' : 'bottom-2'
        )}
      />
      <div
        className={
          'absolute h-1.5 w-1.5 cursor-pointer rounded-full bg-rose-700 shadow-lg ring-1 ring-white'
        }
      />
    </div>
  ) : null;
};

const Map_ = ({ center, zoom, locations, updateCenter, addLocation }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const currentLocations = useRef<LatLngLiteral[]>(locations || []);
  const autoCompleteService = useRef<AutocompleteService>();
  const placesService = useRef<PlacesService>();
  const [map, setMap] = useState<google.maps.Map>();
  const [dragging, setDragging] = useState(false);
  const [addingLocation, setAddingLocation] = useState(false);
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);

  useEffect(() => {
    if (mapRef.current && !map) {
      const newMap = new window.google.maps.Map(mapRef.current, {
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        keyboardShortcuts: false,
        ...(center && { center }),
        ...(zoom && { zoom }),
      });

      newMap.addListener('dragstart', () => setDragging(true));
      newMap.addListener('dragend', () => {
        setDragging(false);
        updateCenter && updateCenter(getCenter(newMap));
      });

      window.google.maps.event.addListener(newMap, 'tilesloaded', () => {
        updateCenter && updateCenter(getCenter(newMap));
      });

      autoCompleteService.current = new window.google.maps.places.AutocompleteService();

      placesService.current = new window.google.maps.places.PlacesService(newMap);

      setMap(newMap);
    }
  }, [map, updateCenter, center, zoom]);

  useEffect(() => {
    if (map) {
      const locationsDiff = differenceWith(locations, currentLocations.current, isEqual);
      const markers = locations?.map((location) => {
        const animation = locationsDiff.includes(location)
          ? window.google.maps.Animation.DROP
          : null;

        return new window.google.maps.Marker({
          position: location,
          animation,
          map,
        });
      });

      if (isEmpty(locationsDiff)) {
        const bounds = calculateBounds(locations);
        map.fitBounds(bounds);
      }

      // Is this okay? How will it be GC'ed?
      new MarkerClusterer({ map, markers });
      currentLocations.current = locations || [];
    }
  }, [map, locations]);

  const onStartAddingLocation = useCallback(() => {
    setAddingLocation(true);
  }, []);

  const onCancelAddingLocation = useCallback(() => {
    setAddingLocation(false);
    setAutoCompleteOptions([]);
  }, []);

  const onSearch = useCallback(
    (q: string) => fetchPredictions(q, autoCompleteService.current, setAutoCompleteOptions),
    []
  );

  const onPlaceSelect = useCallback(
    (place: any) => {
      fetchPlaceDetails(
        place,
        placesService.current,
        ({ center, bounds }: { center: LatLngLiteral; bounds: any }) => {
          updateCenter(center);
          map?.setCenter(center);
          map?.fitBounds(bounds);
        }
      );
      setAutoCompleteOptions([]);
    },
    [map, updateCenter]
  );

  const onResetLocation = useCallback(() => {
    const bounds = calculateBounds(locations);
    map?.fitBounds(bounds);
  }, [map, locations]);

  const onConfirmLocation = useCallback(() => {
    setAddingLocation(false);
    setAutoCompleteOptions([]);
    addLocation(getCenter(map));
  }, [addLocation, map]);

  return (
    <div
      className={
        'relative flex h-[40rem] w-full items-center justify-center overflow-hidden rounded-lg shadow'
      }>
      <div ref={mapRef} className={'h-full w-full'} id={'map'} />

      <StartAddLocation show={!addingLocation} onClick={onStartAddingLocation} />

      <CancelAddLocation show={addingLocation} onClick={onCancelAddingLocation} />

      <SearchLocation
        options={autoCompleteOptions}
        show={addingLocation}
        onChange={onSearch}
        onSelect={onPlaceSelect}
      />

      <AddLocationPin dragging={dragging} show={addingLocation} />

      <ConfirmAddLocation show={addingLocation} onClick={onConfirmLocation} />

      <ResetLocation onClick={onResetLocation} />
    </div>
  );
};

export const Map = ({ center, zoom, locations, addLocation, updateCenter }: MapProps) => {
  return (
    <Wrapper apiKey={GOOGLE_MAPS_API_KEY} libraries={['places']} render={render}>
      <Map_
        addLocation={addLocation}
        center={center}
        locations={locations}
        updateCenter={updateCenter}
        zoom={zoom}
      />
    </Wrapper>
  );
};

Map_.defaultProps = {
  locations: [],
};

/*
TODO
Search debounce
zoom out button
Default center and zoom if no location based on country
Not confident of the useEffect hooks, check if there are memory leaks
 */
