import { useReducer, useEffect } from 'react';
import axios from 'axios';
import appReducer, {
  AUTHORIZE,
  CREATE,
  DELETE,
  INIT_CENTER
} from 'reducers/appReducer';
// const socket = new WebSocket('');

const GET_IP = 'https://api.ipify.org/?format=json';
const GET_LATLNG = 'http://ip-api.com/json/';

const initApp = {
  authorized: false,
  name: '',
  center: { }
};

const fakeLogins = [{
  email: 'test@test.ca',
  password: 'asd'
}];

const useApplicationData = () => { // login and user state information
  const [appState, dispatch] = useReducer(appReducer, initApp);

  useEffect(() => {
    axios.get(GET_IP)
    .then(body => {
      axios.get(`${GET_LATLNG}/${body.data.ip}`)
      .then(coords => {
        dispatch({ type: INIT_CENTER, center: { lat: coords.data.lat, lng: coords.data.lon, city: coords.data.city } });
      });
    });
  }, []);

  const createHandle = (event) => {
    if (true) {
      // ... stage created state object
      // axios
      //.post({url: '/api/whatever', data:{ ...stuff }})
      //.then(res => console.log(res.data) )
      //.catch(er => console.log(er))
      dispatch({ type: CREATE });
    }
  };
  const deleteHandle = (id) => {
    if (true) {
      // ... stage created state object
      // axios.delete('/api/whatever/${id}')
      //.then(res => console.log(res.data))
      //.catch(er => console.log(er))
      dispatch({ type: DELETE });
    }
  };

  const submitHandle = (email, password) => {
    axios
      .post({ data: { email, password }, url: '/api/login' })
      .then((res) => {
        console.log(res.data);
        if (res.data.auth) {
          dispatch({ type: AUTHORIZE, name: email.split('@')[0].join('') });
        }
      });
  };

  // useEffect(() => {
  //   axios
  //   .get('/api/center')
  //   .then((data) => console.log(data))
  // })

  return {
    submitHandle,
    appState,
    createHandle,
    deleteHandle
  };

};

export default useApplicationData;