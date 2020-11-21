export const ADD_RESULTS = 'ADD_RESULTS';
export const HOVER = 'HOVER';
export const PAN_CENTER = 'PAN_CENTER'

const placeReducer = (mapState, action) => {
  switch(action.type) {

    case ADD_RESULTS: {
      return {...mapState, places: action.results}
    }
    case HOVER: {
      return {...mapState, places: action.results}
    }
    case PAN_CENTER: {
      return {...mapState, center:{...action.coords}}
    }
    default:
      throw new Error('Invalid use map action type') 
  }
};

export default placeReducer;