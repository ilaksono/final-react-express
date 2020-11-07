import { useReducer } from 'react';
import axios from 'axios';
import {
  appReducer,
  AUTHORIZE,
  CREATE,
  DELETE
} from 'reducers/appReducer';
import { logReducer, EMPTY_FIELD } from 'reducers/logReducer';
// const socket = new WebSocket('');

const initApp = {
  authorized: false,
  name: ''
};
const initLogin = {
  email: '',
  password: '',
  errMsg: ''
};

const fakeLogins = {
  email: 'test@test.ca',
  password: 'asd'
};

const useApplicationData = () => {
  const [appState, appDispatch] = useReducer(appReducer, initApp);
  const [logState, logDispatch] = useReducer(logReducer, initLogin);

  const validate = () => {
    if (!logState.email || !logState.password) {
      logDispatch({ type: EMPTY_FIELD });
      return false;
    }
    return true;
  };

  const createHandle = (event) => {
    if (true) {
      // ... stage created state object
      // axios
      //.post({url: '/api/whatever', data:{ ...stuff }})
      //.then(res => console.log(res.data) )
      //.catch(er => console.log(er))
      appDispatch({ type: CREATE });
    }
  };
  const deleteHandle = (id) => {
    if (true) {
      // ... stage created state object
      // axios.delete('/api/whatever/${id}')
      //.then(res => console.log(res.data))
      //.catch(er => console.log(er))
      appDispatch({ type: DELETE });
    }
  };

  const submitHandle = (event) => {
    event.preventDefault();
    if (validate(logState)) {
      axios
        .post({ data: { email: logState.email, password: logState.password }, url: '/api/login' })
        .then((res) => {
          console.log(res.data);
          if (res.data.auth) {
            appDispatch({ type: AUTHORIZE, name: logState.email.split('@')[0].join('') });
          }
        });
    }
  };

  return {
    logState,
    submitHandle,
    appState,
    createHandle,
    deleteHandle,
  };

};

export default useApplicationData;