import { useReducer, useEffect, useState, useCallback } from 'react';
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

const initTops = {
  show: [],
  city: null
};

const initApp = {
  authorized: false,
  name: '',
  center: {}
};

const fakeLogins = [{
  email: 'test@test.ca',
  password: 'asd'
}];

const useApplicationData = () => { // login and user state information
  const [appState, dispatch] = useReducer(appReducer, initApp);
  const [tops, setTops] = useState(initTops);

  useEffect(() => {
    axios.get(GET_IP)
      .then(body => {
        axios.get(`${GET_LATLNG}/${body.data.ip}`)
          .then(coords => {
            dispatch({
              type: INIT_CENTER, center: {
                lat: coords.data.lat,
                lng: coords.data.lon,
                city: coords.data.city
              }
            });
            return coords;
          })
          .then(() => getTops())
          .catch((er) => console.log(er));
      }).catch((err) => console.log(err));
    // eslint-disable-next-line
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
  const getTops = () => {
    const width = '65%';
    const example = [];
    example.push({
      venue: 'Andrew',
      title: 'Andrew',
      width
    });
    example.push({
      venue: 'Daniel',
      title: 'Daniel',
      width

    });
    example.push({
      venue: 'Poop',
      title: 'Poop',
      width

    });
    example.push({
      venue: 'Orgy',
      title: 'Orgy',
      width

    });
    const pArr = example.map((ex) => {
      return axios
        .post('/api/search_one', {
          venue: ex.venue,
          location: 'toronto'
        });
    });
    return Promise.all(pArr)
      .then((all) => {
        all.forEach((each, index) => {
          example[index].location = tops.city;
          example[index].url = each.data[0].image_url;
        });
        return setTops({ ...tops, show: example });
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
    deleteHandle,
    tops,
    getTops
  };

};

export default useApplicationData;