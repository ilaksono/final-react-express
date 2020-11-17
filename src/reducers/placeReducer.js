export const ADD_RESULTS = 'ADD_RESULTS';

const placeReducer = (mapState, action) => {
  switch(action.type) {

    case ADD_RESULTS: {
      return {...mapState, places: action.results}
    }
    default:
      throw new Error('Invalid use map action type') 
  }
};

export default placeReducer;