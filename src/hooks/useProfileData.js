import { useState, useEffect } from 'react';
import axios from 'axios';

const initProfile = {
  all: [],
  reviews: []
};

const useProfileData = () => {
  const [allUsers, setAllUsers] = useState(initProfile);



  const getUsersAPI = () => {
    return axios
      .get('/api/users/public')
      .then(res => res)
      .catch(er => console.log(er));
  };

  const getTimeRating = (id) => {
    return axios
      .get(`/api/reviews/users/${id}`)
      .then(res => {
        // setAllUsers({ ...allUsers, reviews: [...res.data.data] });
        getUsersAPI()
          .then(response => {
            setAllUsers({
              all: response.data.data,
              reviews: res.data.data
            });
          });
      });
  };

  return {
    allUsers,
    getTimeRating,
    getUsersAPI
  };

};


export default useProfileData;