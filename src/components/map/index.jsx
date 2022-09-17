// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { debounce, differenceWith, isEmpty, isEqual } from "lodash";
import { mapsApiKey } from "secrets";
import {
  CheckIcon,
  LocationMarkerIcon as LocationMarkerIconSolid,
  PlusIcon,
  XIcon,
} from "@heroicons/react/solid";
import {
  LocationMarkerIcon as LocationMarkerIconOutline,
  RefreshIcon,
} from "@heroicons/react/outline";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { Select } from "components/select";

const render = (status) => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
};

function _fetchPredictions(q, autoCompleteService, callback) {
  autoCompleteService
    .getPlacePredictions({ input: q })
    .then((results) =>
      isEmpty(results) ? callback([]) : callback(results.predictions)
    );
}

const fetchPredictionsDebounced = debounce(_fetchPredictions, 1000);

const fetchPredictions = (q, autoCompleteService, callback) => {
  if (isEmpty(q)) {
    callback([]);
  } else {
    fetchPredictionsDebounced(q, autoCompleteService, callback);
  }
};

function fetchPlaceDetails({ place_id }, placesService, callback) {
  placesService.getDetails({ placeId: place_id }, (result) => {
    const { location, viewport } = result.geometry;
    callback({
      center: {
        lat: location.lat(),
        lng: location.lng(),
      },
      bounds: viewport,
    });
  });
}

function calculateBounds(locations) {
  const bounds = new window.google.maps.LatLngBounds();
  locations.map((location) => {
    bounds.extend(location);
  });
  return bounds;
}

function getCenter(map) {
  const center = map.getCenter();
  const lat = center.lat();
  const lng = center.lng();
  return { lat, lng };
}

function Map_({ center, zoom, locations, updateCenter, addLocation }) {
  const mapRef = useRef();
  const currentLocations = useRef(locations);
  const autoCompleteService = useRef();
  const placesService = useRef();
  const [map, setMap] = useState();
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

      newMap.addListener("dragstart", () => setDragging(true));
      newMap.addListener("dragend", () => {
        setDragging(false);
        updateCenter && updateCenter(getCenter(newMap));
      });

      window.google.maps.event.addListener(newMap, "tilesloaded", () => {
        updateCenter && updateCenter(getCenter(newMap));
      });

      autoCompleteService.current =
        new window.google.maps.places.AutocompleteService();

      placesService.current = new window.google.maps.places.PlacesService(
        newMap
      );

      setMap(newMap);
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      const locationsDiff = differenceWith(
        locations,
        currentLocations.current,
        isEqual
      );
      // Is this okay? How will it be GC'ed?
      const markers = locations.map((location) => {
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

      new MarkerClusterer({ map, markers });
      currentLocations.current = locations;
    }
  }, [map, locations]);

  const markerIconCls =
    "inline-block absolute stroke-white stroke-[0.7px] text-indigo-600 h-16 w-16 transition-all duration-150 ease-in-out " +
    (dragging ? "bottom-9" : "bottom-2");

  return (
    <div
      className={
        "relative inline-block flex h-[36rem] w-full items-center justify-center overflow-hidden rounded-lg shadow"
      }
    >
      <div ref={mapRef} id="map" className={"h-full w-full"} />

      {!addingLocation && (
        <button
          className={
            "group absolute top-2 right-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-stone-50 bg-white shadow-xl ahover:hover:bg-stone-50"
          }
          onClick={() => setAddingLocation(true)}
        >
          <LocationMarkerIconOutline
            className={
              "h-9 w-9 text-stone-500 ahover:group-hover:text-stone-700"
            }
          />
          <PlusIcon
            className={
              "absolute bottom-0 right-2.5 block h-3 w-3 -translate-y-1/2 translate-x-1/2 transform rounded-full bg-white text-stone-500 ring-1 ring-white group-hover:bg-gray-50 group-hover:ring-stone-50 ahover:group-hover:text-stone-700"
            }
          />
        </button>
      )}

      {addingLocation && (
        <div className={"absolute flex items-center justify-center"}>
          <LocationMarkerIconSolid className={markerIconCls} />
          <div
            className={
              "absolute h-1.5 w-1.5 cursor-pointer rounded-full bg-indigo-600 shadow-lg ring ring-2 ring-white"
            }
          />
        </div>
      )}

      {addingLocation && (
        <button
          className={
            "group absolute top-3.5 right-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-stone-50 bg-white text-stone-600 shadow-xl ahover:hover:bg-stone-50"
          }
          onClick={() => {
            setAutoCompleteOptions([]);
            setAddingLocation(false);
          }}
        >
          <XIcon
            className={
              "h-5 w-5 text-stone-500 ahover:group-hover:text-stone-800"
            }
          />
        </button>
      )}

      {addingLocation && (
        <div className={"absolute top-3 w-1/2"}>
          <Select
            onChoose={(place) => {
              fetchPlaceDetails(
                place,
                placesService.current,
                ({ center, bounds }) => {
                  updateCenter(center);
                  map.setCenter(center);
                  map.fitBounds(bounds);
                }
              );
              setAutoCompleteOptions([]);
            }}
            options={autoCompleteOptions}
            onChange={(q) =>
              fetchPredictions(
                q,
                autoCompleteService.current,
                setAutoCompleteOptions
              )
            }
          />
        </div>
      )}

      {addingLocation && (
        <button
          className={
            "absolute bottom-11 flex items-center justify-center space-x-2 rounded-full border border-stone-50 bg-white py-2 px-5 font-medium text-stone-500 shadow-xl hover:bg-stone-50 hover:text-stone-800"
          }
          onClick={() => {
            setAddingLocation(false);
            setAutoCompleteOptions([]);
            addLocation();
          }}
        >
          <CheckIcon className={"h-5 w-5"} />
          <p>Confirm Location</p>
        </button>
      )}

      <button
        className={
          "group absolute bottom-10 left-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-stone-50 bg-white text-stone-600 shadow-xl ahover:hover:bg-stone-50"
        }
        onClick={() => {
          const bounds = calculateBounds(locations);
          map.fitBounds(bounds);
        }}
      >
        <RefreshIcon
          className={"h-7 w-7 text-stone-500 ahover:group-hover:text-stone-800"}
        />
      </button>
    </div>
  );
}

export const Map = ({
  center,
  zoom,
  locations = [],
  addLocation,
  updateCenter,
}) => {
  return (
    <Wrapper apiKey={mapsApiKey} render={render} libraries={["places"]}>
      <Map_
        center={center}
        zoom={zoom}
        locations={locations}
        addLocation={addLocation}
        updateCenter={updateCenter}
      />
    </Wrapper>
  );
};

/*
TODO
Search debounce
zoom out button
Default center and zoom if no location based on country
Not confident of the useEffect hooks, check if there are memory leaks
 */
