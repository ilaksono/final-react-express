import { useReducer } from 'react';
import axios from 'axios';
import {
  appReducer,
  AUTHORIZE,
  CREATE,
  DELETE
} from 'reducers/appReducer';
// const socket = new WebSocket('');

const initApp = {
  authorized: false,
  name: ''
};

const fakeLogins = [{
  email: 'test@test.ca',
  password: 'asd'
}];

const useApplicationData = () => {
  const [appState, appDispatch] = useReducer(appReducer, initApp);



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

  const submitHandle = (email, password) => {
    axios
      .post({ data: { email, password }, url: '/api/login' })
      .then((res) => {
        console.log(res.data);
        if (res.data.auth) {
          appDispatch({ type: AUTHORIZE, name: email.split('@')[0].join('') });
        }
      });
  };

  return {
    submitHandle,
    appState,
    createHandle,
    deleteHandle,
  };

};

export default useApplicationData;