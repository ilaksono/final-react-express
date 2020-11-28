export const AUTHORIZE = 'AUTHORIZE';
export const CREATE = 'CREATE';
export const DELETE = 'DELETE';
export const INIT_CENTER = 'INIT_CENTER';
export const LOGOUT = 'LOGOUT';
export const ADD_FAV = 'ADD_FAV';
export const REMOVE_FAV = 'REMOVE_FAV';
const appReducer = (appState, action) => {

  switch (action.type) {
    case AUTHORIZE: {
      return {
        ...appState,
        authorized: true,
        name: action.name,
        profile_pic: action.profile_pic,
        user_id: action.user_id,
        favs: action.favs,
        likes: action.likes
      };
    }
    case LOGOUT: {
      return {
        ...appState,
        authorized: false,
        name: ''
      }
    }
    case CREATE: {
      return { ...appState };
    }
    case DELETE: {
      return { ...appState };
    }
    case INIT_CENTER: {
      return { ...appState, center: action.center };
    }
    case ADD_FAV: {
      return {...appState, favs: [...appState.favs, action.biz_id]}
    }
    case REMOVE_FAV: {
      return {...appState, favs: action.favs}
    }
    default:
      throw new Error('Invalid action type for data');
  }
};

export default appReducer;