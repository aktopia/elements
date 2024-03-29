import { ArrowPathOutline, MapPinSolid } from '@elements/icons';
import { calculateBounds, getBounds, getCenter } from '@elements/utils/location';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { cx } from '@elements/utils';
import differenceWith from 'lodash/differenceWith';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
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

const { Map: GoogleMap } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary;

export type LatLng = google.maps.LatLngLiteral;
export type LatLngBounds = { north: number; east: number; south: number; west: number };
export type GoogleMap = google.maps.Map;

const EMPTY_LOCATIONS: LatLng[] = [];

const DEFAULT_ZOOM = 7;

interface MapProps {
  initialCenter?: LatLng;
  locations?: LatLng[];
  initialZoom?: number;
  onDragStart?: ({ center }: { center: LatLng }) => void;
  onDragEnd?: ({ center }: { center: LatLng }) => void;
  onTilesLoaded?: ({ center }: { center: LatLng }) => void;
}

export interface MapHandle {
  setCenter: ({ center, bounds }: { center: LatLng; bounds?: LatLngBounds }) => void;
  getCenter: () => LatLng | undefined;
  getZoom: () => number | undefined;
  getBounds: () => LatLngBounds | undefined;
}

const ResetLocation = ({ onClick }: { onClick: any }) => {
  return (
    <button
      className={
        'group absolute bottom-36 left-2 flex cursor-pointer items-center justify-center rounded-full border border-stone-400 bg-white p-1.5 text-stone-600 shadow-2xl hover:bg-stone-50'
      }
      type={'button'}
      onClick={onClick}>
      <ArrowPathOutline className={'h-7 w-7 stroke-2 text-stone-500 group-hover:text-stone-800'} />
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

const initMap = ({
  initialCenter,
  initialZoom,
  ref,
  onDragStart,
  onDragEnd,
  onTilesLoaded,
}: any) => {
  const map = new GoogleMap(ref, {
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    keyboardShortcuts: false,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM,
    },
    zoom: initialZoom || 4, // TODO Set user zoom as default zoom
    center: initialCenter,
  });

  map.addListener('dragstart', () => {
    onDragStart && onDragStart({ center: getCenter(map) });
  });

  map.addListener('dragend', () => {
    onDragEnd && onDragEnd({ center: getCenter(map) });
  });

  map.addListener('tilesloaded', () => {
    onTilesLoaded && onTilesLoaded({ center: getCenter(map) });
  });

  return map;
};

// DO NOT MAKE THIS A CONTROLLED COMPONENT
const MapRefRender: ForwardRefRenderFunction<MapHandle, MapProps> = (
  {
    initialCenter,
    onTilesLoaded,
    initialZoom = DEFAULT_ZOOM,
    locations = EMPTY_LOCATIONS,
    onDragEnd,
    onDragStart,
  },
  ref
) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const currentLocations = useRef<LatLng[]>(locations || []);
  const [map, setMap] = useState<google.maps.Map>();

  useImperativeHandle(ref, () => ({
    setCenter: ({ center, bounds }) => {
      map?.setCenter(center);
      bounds && map?.fitBounds(bounds);
    },
    getCenter: () => {
      return map && getCenter(map);
    },
    getZoom: () => {
      return map?.getZoom();
    },
    getBounds: () => {
      return map && getBounds(map);
    },
  }));

  useEffect(() => {
    if (mapRef.current && !map) {
      const newMap = initMap({
        initialCenter,
        initialZoom,
        ref: mapRef.current,
        onDragStart,
        onDragEnd,
        onTilesLoaded,
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

      // When a new location is added do not fit bounds as it is bad UX,
      // but when initially rendering fit bounds
      if (isEmpty(locationsDiff) && locations.length > 1) {
        const bounds = calculateBounds(locations);
        map.fitBounds(bounds);
      }

      // When a new location is added do not fit bounds as it is bad UX,
      // but when initially rendering and there is only one location set that as center
      if (isEmpty(locationsDiff) && locations.length === 1) {
        map?.setCenter(locations[0]);
        map?.setZoom(DEFAULT_ZOOM);
      }

      // Is this okay? How will it be GC'ed?
      new MarkerClusterer({ map, markers });
      currentLocations.current = locations;
    }
  }, [locations, map]);

  const onResetLocation = useCallback(() => {
    if (locations.length > 1) {
      const bounds = calculateBounds(locations);
      map?.fitBounds(bounds);
    } else if (locations.length === 1) {
      map?.setCenter(locations[0]);
      map?.setZoom(DEFAULT_ZOOM);
    } else {
      initialCenter && map?.setCenter(initialCenter);
      initialZoom && map?.setZoom(initialZoom);
    }
  }, [locations, map, initialCenter, initialZoom]);

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
