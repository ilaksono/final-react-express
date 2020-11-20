export const ADD_RESULTS = 'ADD_RESULTS';
export const HOVER = 'HOVER';

const placeReducer = (mapState, action) => {
  switch(action.type) {

    case ADD_RESULTS: {
      return {places: action.results}
    }
    case HOVER: {
      return {places: action.results}
    }
    default:
      throw new Error('Invalid use map action type') 
  }
};

export default placeReducer;