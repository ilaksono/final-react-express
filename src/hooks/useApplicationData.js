import { useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import appReducer, {
  AUTHORIZE,
  CREATE,
  DELETE,
  INIT_CENTER,
  LOGOUT,
  ADD_FAV,
  REMOVE_FAV
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
  center: {},
  profile_pic: '',
  user_id: null,
  likes: [],
  favs: [],
};

const initReg = {
  username: '',
  email: '',
  password: '',
  errMsg: '',

};
const useApplicationData = () => { // login and user state information
  const [appState, dispatch] = useReducer(appReducer, initApp);
  const [tops, setTops] = useState(initTops);
  const [userDetails, setUserDetails] = useState(initReg);

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

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  // const submitHandle = (email, password) => {
  //   axios
  //     .post({ data: { email, password }, url: '/api/login' })
  //     .then((res) => {
  //       console.log(res.data);
  //       if (res.data.auth) {
  //         dispatch({ type: AUTHORIZE, name: email.split('@')[0].join('') });
  //       }
  //     });
  // };
  const authorizeUser = (name, profile_pic, user_id, likes, favs) => {
    console.log("authorizing", user_id);
    dispatch({ type: AUTHORIZE, name, profile_pic, user_id, likes, favs });
  };

  const handleFav = (biz_id) => {
    if (!appState.favs.includes(biz_id)) {
      dispatch({type: ADD_FAV, biz_id});
      return false;
    }
    const favs = [...appState.favs];
    favs.splice(favs.indexOf(biz_id), 1);
    dispatch({type: REMOVE_FAV, favs})
    return true;
  };

  const getTops = () => {
    const width = '100%';
    const example = [];

    example.push({
      venue: 'Parks',
      title: 'Parks',
      width
    });

    example.push({
      venue: 'Patios',
      title: 'Patios',
      width
    });

    example.push({
      venue: 'Delivery',
      title: 'Delivery',
      width
    });

    example.push({
      venue: 'Restaurants',
      title: 'Restaurants',
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
          example[index].url = each.data;
        });
        return setTops({ ...tops, show: example });
      });
  };


  return {
    // submitHandle,
    appState,
    userDetails,
    setUserDetails,
    createHandle,
    deleteHandle,
    tops,
    getTops,
    authorizeUser,
    logout,
    handleFav
  };
};

export default useApplicationData;