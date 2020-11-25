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

  const profileHelpCount = (reviewID, term) => {
    let cpy = [...allUsers.reviews];
    if (term === 'add') {
      cpy
        .forEach((review, index) => {
          if (review.id === reviewID)
            cpy[index].helpful_count += 1;
        });
    } else if (term === 'delete') {
      cpy
        .forEach((review, index) => {
          if (review.id === reviewID)
            cpy[index].helpful_count -= 1;
        });
    }
    return setAllUsers({ ...allUsers, reviews: [...cpy] });
  };
  // review id
  // my name

  return {
    allUsers,
    getTimeRating,
    getUsersAPI,
    profileHelpCount
  };

};


export default useProfileData;