import { ArrowPathOutline, MapPinSolid } from '@elements/icons';
import { calculateBounds, getCenter } from '@elements/utils/location';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { cx } from '@elements/utils';
import { differenceWith, isEmpty, isEqual } from 'lodash';
import type { ForwardRefRenderFunction } from 'react';
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import LatLngLiteral = google.maps.LatLngLiteral; //TODO import type only
import LatLngBounds = google.maps.LatLngBounds;

const { Map: GoogleMap } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary;

export type LatLng = LatLngLiteral;

interface MapProps {
  initialCenter?: LatLng;
  locations?: LatLng[];
  initialZoom?: number;
  onDragStart?: ({ center }: { center: LatLng }) => void;
  onDragEnd?: ({ center }: { center: LatLng }) => void;
  onTilesLoaded?: ({ center }: { center: LatLng }) => void;
}

export interface MapHandle {
  updateCenter: ({ center, bounds }: { center: LatLng; bounds: LatLngBounds }) => void;
}

const ResetLocation = ({ onClick }: { onClick: any }) => {
  return (
    <button
      className={
        'group absolute bottom-32 left-2 flex cursor-pointer items-center justify-center rounded-full border border-stone-300 bg-white p-1.5 text-stone-600 shadow-2xl hover:bg-stone-50'
      }
      type={'button'}
      onClick={onClick}>
      <ArrowPathOutline className={'h-7 w-7 text-stone-500 group-hover:text-stone-800'} />
    </button>
  );
};

export const AddLocationPin = ({ dragging }: { dragging: boolean }) => {
  return (
    <div className={'absolute top-1/2 right-1/2 flex items-center justify-center'}>
      <div className={'relative'}>
        <MapPinSolid
          className={cx(
            'absolute -left-10 inline-block h-20 w-20 stroke-red-700 text-red-600 transition-all duration-150 ease-in-out ',
            dragging ? 'bottom-9' : 'bottom-2'
          )}
        />

        <div
          className={
            'absolute -top-1 -left-1 h-2 w-2 cursor-pointer rounded-full bg-red-600 shadow-lg ring-1 ring-red-700'
          }
        />
      </div>
    </div>
  );
};

const emptyLocations: LatLng[] = [];

// DO NOT MAKE THIS A CONTROLLED COMPONENT
const MapRefRender: ForwardRefRenderFunction<MapHandle, MapProps> = (
  { initialCenter, onTilesLoaded, initialZoom, locations = emptyLocations, onDragEnd, onDragStart },
  ref
) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const currentLocations = useRef<LatLng[]>(locations || []);
  const [map, setMap] = useState<google.maps.Map>();

  useImperativeHandle(ref, () => ({
    updateCenter: ({ center, bounds }) => {
      map?.setCenter(center);
      bounds && map?.fitBounds(bounds);
    },
  }));

  useEffect(() => {
    if (mapRef.current && !map) {
      // TODO fix center not being set on initial renders
      const newMap = new GoogleMap(mapRef.current, {
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        keyboardShortcuts: false,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_BOTTOM,
        },
        ...(initialCenter && { center: initialCenter }),
        ...(initialZoom && { zoom: initialZoom }),
      });

      newMap.addListener('dragstart', () => {
        onDragStart && onDragStart({ center: getCenter(newMap) });
      });

      newMap.addListener('dragend', () => {
        onDragEnd && onDragEnd({ center: getCenter(newMap) });
      });

      window.google.maps.event.addListener(newMap, 'tilesloaded', () => {
        onTilesLoaded && onTilesLoaded({ center: getCenter(newMap) });
      });

      setMap(newMap);
    }
  }, [map, onDragEnd, onDragStart, onTilesLoaded, initialCenter, initialZoom]);

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
  }, [locations, map]);

  const onResetLocation = useCallback(() => {
    const bounds = calculateBounds(locations);
    map?.fitBounds(bounds);
  }, [locations, map]);

  return (
    <>
      <div ref={mapRef} className={'h-full w-full'} id={'map'} />
      <ResetLocation onClick={onResetLocation} />
    </>
  );
};

export const Map = memo(forwardRef(MapRefRender));

/*
TODO
Search debounce
Default center and zoom if no location based on country
Not confident of the useEffect hooks, check if there are memory leaks
Add tooltips
 */
