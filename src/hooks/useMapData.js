import { useReducer } from 'react';

const ADD_RESULTS = 'ADD_RESULTS';
const reducer = (mapState, action) => {
  switch(action.type) {

    case ADD_RESULTS: {
      return {...mapState, places: action.results}
    }
    default:
      throw new Error('Invalid use map action type') 
  }
};

const initMapState = {
  places: []
}

const useMapData = () => {
  const [mapState, dispatch] = useReducer(reducer, initMapState);

  const addResults = (results) => {
    dispatch({type: ADD_RESULTS, results})
  }
  return {
    mapState,
    addResults
  };
};

export default useMapData;