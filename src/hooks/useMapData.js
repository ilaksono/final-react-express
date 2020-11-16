import { useReducer } from 'react';
import placeReducer, {ADD_RESULTS} from 'reducers/placeReducer.js';

const initMapState = {
  places: []
}

const useMapData = () => {
  const [mapState, dispatch] = useReducer(placeReducer, initMapState);

  const addResults = (results) => {
    dispatch({type: ADD_RESULTS, results})
  }
  return {
    mapState,
    addResults
  };
};

export default useMapData;