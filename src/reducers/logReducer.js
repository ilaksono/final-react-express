export const EMPTY_FIELD = 'EMPTY_FIELD';

export const logReducer = (logState, action) => {
  switch (action.type) {
    case EMPTY_FIELD:
      return { ...logState, errMsg: 'Fields cannot be empty' };
    default:
      throw new Error('Invalid action type for login');
  }
};