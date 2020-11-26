import { useState, useEffect } from 'react';
import axios from 'axios';
import { PowerOffSharp } from '@material-ui/icons';

const initProfile = {
  all: [],
  reviews: [],
  favs: [],
  avgCoords: { lat: 43, lng: -79 }
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
            getUsersFavs(id)
              .then(rez => {
                const { lat, lng } = {
                };
                setAllUsers({
                  all: response.data.data,
                  reviews: res.data.data,
                  favs: rez.data.data
                });
              });
          });
      });
  };

  const getUsersFavs = (id) => {
    return axios
      .get(`/api/favs/users/${id}`)
      .then(res => res)
      .catch(er => console.log(er));
  };
  
  const profileHelpCount = (reviewID, term) => {
    let cpy = [...allUsers.reviews];
    let cpyAll = [...allUsers.all];
    let revOwnerID = -1;
    if (term === 'add') {
      cpy
        .forEach((review, index) => {
          if (review.id === reviewID) {
            cpy[index].helpful_count += 1;
            revOwnerID = review.user_id;
          }
        });
    } else if (term === 'delete') {
      cpy
        .forEach((review, index) => {
          if (review.id === reviewID) {
            cpy[index].helpful_count -= 1;
            revOwnerID = review.user_id;
          }
        });
    }
    cpyAll.forEach((user, index) => {
      if (user.id === revOwnerID) {
        if (term === 'add')
          cpyAll[index].total++;
        else if (term === 'delete')
          cpyAll[index].total--;
      }
    });
    return setAllUsers({ ...allUsers, reviews: [...cpy], all: [...cpyAll] });
  };

  const profileEditReview = () => {
    
  }

  const profileDeleteReview = (reviewID) => {
    let copiedReviews = [...allUsers.reviews]
    copiedReviews.forEach(review => {
      if (review.id === reviewID) {
        const indexOfReview =copiedReviews.indexOf(review)
        copiedReviews.splice(indexOfReview, 1);
        setAllUsers({...allUsers, reviews: [...copiedReviews]})
      }
    })
  }
  
  // review id
  // my name

  return {
    allUsers,
    getTimeRating,
    getUsersAPI,
    profileHelpCount,
    setAllUsers,
    profileDeleteReview
  };

};


export default useProfileData;