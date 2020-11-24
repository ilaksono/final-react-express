import { useState, useEffect } from 'react';
import axios from 'axios';

const initProfile = {
  all: [],
  reviews: []
}

const useProfileData = () => {
  const [allUsers, setAllUsers] = useState(initProfile);

  // useEffect(() => {
  //   getUsersAPI();
  // });

  const getUsersAPI = () => {
    axios
      .get('api/users/public')
      .then((res) => setAllUsers({...allUsers, all:[res.data.data]}));
  };
  
  const getTimeRating = (id) => {
    axios
    .get(`api/reviews/users/${id}`)
    .then(res => {
      setAllUsers({...allUsers, reviews:[...res]})
    })
  };

  return {
    allUsers,
    getTimeRating
  };

};


export default useProfileData;