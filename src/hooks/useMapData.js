import { useReducer } from 'react';
import placeReducer, { ADD_RESULTS } from 'reducers/placeReducer.js';

const initMapState = {
  places: []
};

const useMapData = () => {
  const [mapState, dispatch]
    = useReducer(placeReducer, initMapState);

  const addResults = (refined) => {
    // if (refined.length > 0) {
      const results = refined.map(biz =>
        ({ lat: biz.latitude, lng: biz.longitude }));
      dispatch({ type: ADD_RESULTS, results });
    // }
  };
  return {
    mapState,
    addResults
  };
};

export default useMapData;