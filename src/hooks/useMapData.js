import {
  useReducer,
  useEffect,
  useRef,
  useCallback,
  useState
} from 'react';
import placeReducer, 
{ ADD_RESULTS, 
  HOVER, 
  PAN_CENTER } 
  from 'reducers/placeReducer.js';

const initMapState = {
  places: [],
  center: { lat: 0, lng: 0 }
};

const useMapData = () => {
  const [mapState, dispatch]
    = useReducer(placeReducer, initMapState);

  const addResults = (refined) => {
    // if (refined.length > 0) {
      const results = refined.map((biz, index) =>
        ({ lat: biz.latitude, lng: biz.longitude, id: biz.id, hover: false}));
      dispatch({ type: ADD_RESULTS, results });
    // }
  };

  const notHoverMarker = () => {
    const results = mapState.places.map((marker) => {
      if (marker.hover === true)
        marker.hover = false;
      return marker;
    });
    dispatch({ type: HOVER, results });
  };

  
  const hoverMarker = ({ id, lat, lng }) => {

    const results = mapState.places.map((marker) => {
      if (marker.id === id)
        return { ...marker, hover: true };
      else return { ...marker };
    });

    dispatch({ type: HOVER, results });
  };

  const populateCenter = (results) => {
    const coords = {
      lat: results.reduce((a, biz) => {
        return a + biz.latitude;
      }, 0) / results.length,
      lng: results.reduce((a, biz) => {
        return a + biz.longitude;
      }, 0) / results.length
    };
    dispatch({ type: PAN_CENTER, coords });
  };
  const getCenterPan = (results) => {
    return new Promise((res, rej) => {
      const coords = {
        lat: results.reduce((a, biz) => {
          return a + biz.latitude;
        }, 0) / results.length,
        lng: results.reduce((a, biz) => {
          return a + biz.longitude;
        }, 0) / results.length
      };
      dispatch({ type: PAN_CENTER, coords });
      res({ lat: coords.lat, lng: coords.lng });
    });
  };
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  const panTo = useCallback((center) => {
    if (center && mapRef.current) {
      mapRef.current.panTo(center);
    }
    else if (mapRef.current) {
      mapRef.current.panTo(mapState.center);
    }
  }, []);
  

  // const onLoad = useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds();
  //   map.fitBounds(bounds);
  //   setMap(map);
  // }, []);
  return {
    mapState,
    addResults,
    hoverMarker,
    notHoverMarker,
    panTo,
    onMapLoad,
    mapRef,
    populateCenter,
    getCenterPan
  };
};

export default useMapData;