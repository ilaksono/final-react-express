import { useReducer, useEffect, useState } from 'react';
import {useCookies} from 'react-cookie';
import axios from 'axios';
import appReducer, {
  AUTHORIZE,
  CREATE,
  DELETE,
  INIT_CENTER,
  LOGOUT,
  ADD_FAV,
  REMOVE_FAV,
  ADD_LIKES,
  REMOVE_LIKES,
  ADD_SEARCH
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
  searchCount: 0
};

const initReg = {
  username: '',
  email: '',
  password: '',
  errMsg: '',

};
const useApplicationData = () => { 
  const [appState, dispatch] = useReducer(appReducer, initApp);
  const [tops, setTops] = useState(initTops);
  const [userDetails, setUserDetails] = useState(initReg);
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    axios.get(GET_IP)
      .then(body => {
        axios.get(`${GET_LATLNG}/${body.data.ip}`)
          .then(coords => {
            console.log(coords);
            dispatch({
              type: INIT_CENTER, center: {
                lat: coords.data.lat,
                lng: coords.data.lon,
                city: coords.data.city,
                region: coords.data.region
              }
            });
            return coords;
          })
          .then(() => getTops())
          .catch((er) => console.log(er));
      }).catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  const authorizeUser = (name, profile_pic, user_id, likes, favs) => {
    console.log("authorizing", user_id);
    dispatch({ type: AUTHORIZE, 
      name, profile_pic, 
      user_id, likes, favs });
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

  const handleLikes = (review_id) => {
    if (!appState.likes.includes(review_id)) {
      dispatch({type: ADD_LIKES, review_id})
      return false;
    } 
    const likes = [...appState.likes]
    likes.splice(likes.indexOf(review_id), 1)
    dispatch({type: REMOVE_LIKES, likes})
    return true;
  }

  const getTops = () => {
    const width = '100%';
    const example = [];

    example.push({
      venue: 'Parks',
      title: 'Parks',
      url: "/Parks.jpg",
      width
    });

    example.push({
      venue: 'Patios',
      title: 'Patios',
      url: '/Patios.jpg',

      width
    });

    example.push({
      venue: 'Gyms',
      title: 'Gyms',
      url: '/Gyms.jpg',
      width
    });

    example.push({
      venue: 'Restaurants',
      title: 'Restaurants',
      url: '/Restaurants.jpg',

      width

    });
    // const pArr = example.map((ex) => {
    //   return axios
    //     .post('/api/yelp/one', {
    //       venue: ex.venue,
    //       location: 'toronto'
    //     });
    // });
    // return Promise.all(pArr)
      // .then((all) => {
        // all.forEach((each, index) => {
          // example[index].location = tops.city;
          // example[index].url = each.data;
        // });
        return setTops({ ...tops, show: example });
      // });
  };

  const addSearchCount = () => {
    dispatch({type: ADD_SEARCH});
  }


  return {
    // submitHandle,
    appState,
    userDetails,
    setUserDetails,
    tops,
    getTops,
    authorizeUser,
    logout,
    handleFav,
    handleLikes,
    addSearchCount
  };
};

export default useApplicationData;