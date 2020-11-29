import { useState } from 'react';
import axios from 'axios';

const initProfile = {
  all: [],
  reviews: [],
  favs: [],
  favsDetails: []
};

const useProfileData = () => {
  const [allUsers, setAllUsers]
    = useState(initProfile);

  const getUsersAPI = () => {
    return axios
      .get('/api/users/public')
      .catch(er => console.log(er));
  };

  const getTimeRating = async (id) => {
    try {
      const reviews = await axios
        .get(`/api/reviews/users/${id}`);
      const users = await getUsersAPI();
      const favs = await getUsersFavs(id);
      const uniqueArr = [];
      favs.data.data
        .forEach(data =>
          !uniqueArr.some(fav =>
            fav.venue_id === data.venue_id)
          && uniqueArr.push(data));
      const rawDetailsData = await getFavsDetails(uniqueArr);
      const allDetails = rawDetailsData
        .map(detail => {
          reviews.data.data.some(review => {
            if (review.venue_id === detail.data.id) {
              detail.data.profile_review = review;
              return true;
            }
            else return false;
          });
          return detail.data;
        });
      setAllUsers({
        all: users.data.data,
        reviews: reviews.data.data,
        favs: uniqueArr,
        favsDetails: allDetails
      });
    } catch (er) {
      console.log(er);
    }
  };
  const getFavsDetails = async (arr) => {
    try {
      const promArr = arr.map(ele =>
        axios.post(`/api/yelp/search/${ele.venue_id}`)
      );
      const allDetails = await Promise.all(promArr);
      // console.log(allDetails);
      return allDetails;
    } catch (er) {
      console.log(er);
    }
  };

  const deleteFavProfile = (venue_id) => {
    const cpy = [...allUsers.favsDetails];
    const cpyMini = [...allUsers.favs];
    const index = allUsers.favsDetails
      .findIndex(fav =>
        fav.id === venue_id);
    cpy.splice(index, 1);
    cpyMini.splice(index, 1);
    setAllUsers({ ...allUsers, favs:cpyMini, favsDetails: cpy });

  };

  const getUsersFavs = (id) => {
    return axios
      .get(`/api/favs/users/${id}`)
      .catch(er => console.log(er));
  };

  const profileHelpCount = (reviewID, term) => {
    let cpy = [...allUsers.reviews];
    let cpyAll = [...allUsers.all];
    let revOwnerID = -1;

    const index = cpy.findIndex(review => {
      if (review.id === reviewID) {
        revOwnerID = review.user_id;
        return true;
      }
      return false;
    });
    const ind = cpyAll.findIndex(user => user.id === revOwnerID);
    if (term === 'add') {
      cpyAll[ind].total++;
      cpy[index].helpful_count++;
    } else {
      cpy[index].helpful_count--;
      cpyAll[ind].total--;
    }
    return setAllUsers({ ...allUsers, reviews: cpy, all: cpyAll });
  };

  const profileDeleteReview = (reviewID) => {
    let copiedReviews = [...allUsers.reviews];
    copiedReviews.forEach(review => {
      if (review.id === reviewID) {
        const indexOfReview = copiedReviews.indexOf(review);
        copiedReviews.splice(indexOfReview, 1);
        setAllUsers({ ...allUsers, reviews: copiedReviews });
      }
    });
  };

  return {
    allUsers,
    getTimeRating,
    getUsersAPI,
    profileHelpCount,
    setAllUsers,
    profileDeleteReview,
    deleteFavProfile
  };

};


export default useProfileData;