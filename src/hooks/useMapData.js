import { useReducer } from 'react';
import placeReducer, { ADD_RESULTS, HOVER } from 'reducers/placeReducer.js';

const initMapState = {
  places: []
};

const useMapData = () => {
  const [mapState, dispatch]
    = useReducer(placeReducer, initMapState);

  const addResults = (refined) => {
    // if (refined.length > 0) {
    const results = refined.map(biz =>
      ({ lat: biz.latitude, lng: biz.longitude, id: biz.id, hover: false }));
    dispatch({ type: ADD_RESULTS, results });
    // }
  };
  const hoverMarker = (id) => {

    const results = mapState.places.map((marker) => {
      if (marker.id === id)
        return { ...marker, hover: true };
      else return { ...marker };
    });
    dispatch({ type: HOVER, results });
  };

  const notHoverMarker = () => {
    const results = mapState.places.map((marker) => {
      if (marker.hover === true)
        marker.hover = false;
      return marker;
    });
    dispatch({type: HOVER, results});
  };

  return {
    mapState,
    addResults,
    hoverMarker,
    notHoverMarker
  };
};

export default useMapData;