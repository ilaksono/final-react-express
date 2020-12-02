import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const initProfile = {
  all: [],
  reviews: [], // for the 1 user
  favsDetails: [], // for the 1 user
  loading: false
};

const useProfileData = () => {
  const [allUsers, setAllUsers]
    = useState(initProfile);
  const [proLoading, setProLoading] = useState(false);
  const [favsDetails, setFavsDetails] = useState([]);
  const getUsersAPI = () => {
    return axios
      .get('/api/users/public')
      .catch(er => console.log(er));
  };

  // const getFavourites = () => {
  //   // api call to yelp
  //   const favs = await getUsersFavs(id);
  // }

  const updateFavouriteReview = (venue_id, review) => {
    // loop through all favourites in state, find venue_id and update the review state with argument
    let favouriteCopy = [...favsDetails];
    favouriteCopy = favouriteCopy.map(favourite => {
      console.log(favourite);
      if (favourite.id === venue_id) {
        favourite.profile_review = review;
        return favourite;
      } else 
        return favourite;
      
    });
    const reviewsCopy = [...allUsers.reviews];
    let helpCount = 0;
    let venue_name = '';
    let date = '';
    const index = allUsers.reviews.findIndex(review => {
      if (venue_id === review.venue_id) {
        helpCount = review.helpful_count;
        venue_name = review.venue_name;
        date = review.date;
        return true;
      }
      return false;
    });

    reviewsCopy[index] = review;
    reviewsCopy[index].helpful_count = helpCount;
    reviewsCopy[index].venue_name = venue_name;
    reviewsCopy[index].date = date;

    setAllUsers({ ...allUsers, reviews: reviewsCopy });
    setFavsDetails(favouriteCopy);
  };
  // edit
  // edit -> server -> db -> server -> allUsers.reviews

  // UserProfile/index.js
  //  const [state, setState] = useState()
  //   const state2, setState2] = useState()
  //  di(prev => prev+1);
  //  setState2(prev => prev +2);

  //   useEffect(() => {
  //     loadUserData();    
  //   }, [])

  //   useEffect(() => {
  //     updateFavourites();
  //   }, [reviewState])



  const getTimeRating = async (id) => {
    try {
      setProLoading(true);
      const reviews = await axios
        .get(`/api/reviews/users/${id}`);
      const users = await getUsersAPI();
      // const uniqueArr = [];
      // favs.data.data
      //   .forEach(data =>
      //     !uniqueArr.some(fav =>
      //       fav.venue_id === data.venue_id)
      //     && uniqueArr.push(data));

      const favs = await getUsersFavs(id);
      if (favs.data.data.length > 0) {
      const rawDetailsData = await getFavsDetails(favs.data.data);
      const allDetails = rawDetailsData
        .map(detail => {
          reviews.data.data.some(review => {
            if (review.venue_id === detail.id) {
              detail.profile_review = review;
              return true;
            }
            else return null;
          });
          return detail;
        })
      setFavsDetails(allDetails);
    };
      setProLoading(false);
      setAllUsers({
        all: users.data.data,
        reviews: reviews.data.data,
        // favsDetails: allDetails,
      });
    } catch (er) {
      console.log(er);
    }
  };
  const getFavsDetails = async (arr) => {
    try {
      return axios.post('/api/yelp/search/favs', { arr })
        .then(results => {
          console.log(results, 'hi');
          return results.data.data;
        });/* 
      const promArr = arr.map(ele =>
        axios.post(`/api/yelp/search/${ele.venue_id}`)
      );
      const allDetails = await Promise.all(promArr); */
      // console.log(allDetails);
      /* return allDetails; */
    } catch (er) {
      console.log(er);
    }
  };

  const deleteFavProfile = (venue_id) => {
    const cpy = [...favsDetails];
    const index =favsDetails
      .findIndex(fav =>
        fav.id === venue_id);
    cpy.splice(index, 1);
    setFavsDetails(cpy);
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
    proLoading,
    profileHelpCount,
    setAllUsers,
    profileDeleteReview,
    deleteFavProfile,
    updateFavouriteReview,
    favsDetails
  };

};


export default useProfileData;