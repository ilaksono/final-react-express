export const AUTHORIZE = 'AUTHORIZE';
export const CREATE = 'CREATE';
export const DELETE = 'DELETE';
export const INIT_CENTER = 'INIT_CENTER'

const appReducer = (appState, action) => {

  switch (action.type) {
    case AUTHORIZE: {
      return { ...appState, authorized: true, name: action.name };
    }
    case CREATE: {
      return { ...appState };
    }
    case DELETE: {
      return { ...appState };
    }
    case INIT_CENTER: {
      return {...appState, center: action.center}
    }
    default:
      throw new Error('Invalid action type for data');
  }
};

export default appReducer;