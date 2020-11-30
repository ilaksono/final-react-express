import { useState } from "react";
import axios from 'axios';

const initResults = [{
  id: '',
  name: '',
  image: '',
  categories: '',
  address: '',
  city: '',
  postal: '',
  phone: "",
  yelpRating: '',
  yelpRatingCount: 0,
  latitude: 0.0,
  longitude: 0.0,
  distance: '',
  price: '',
  reviews: [],
  reviewCount: 0,
  overall_rating: NaN,
  delivery: false,
  is_closed: ''
}];

const initBusiness = [{
  id: '',
  name: '',
  image: '',
  address: '',
  city: '',
  postal: '',
  phone: "",
  yelpRating: '',
  yelpRatingCount: 0,
  latitude: 0.0,
  longitude: 0.0,
  distance: '',
  price: '',
  overall_rating: '',
  reviews: [],
  delivery: false,
  is_closed: '',
  hours: [],
  photos: []
}];


export default function useYelpData() {
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [yelpLoading, setYelpLoading] = useState(false);
  const [results, setResults] = useState(initResults);
  const [businessDetails, setBusinessDetails] = useState(initBusiness);

  const resetResults = () => {
    setResults(initResults);
  };

  const getCoreYelpData = (yelpData) => {
    let filteredData = [];
    for (const data of yelpData) {
      const filteredDataItems = {
        "id": data.id,
        "name": data.name,
        "image": data.image_url,
        "categories": data.categories,
        "address": data.location.address1,
        "city": data.location.city,
        "zip_code": data.location.zip_code,
        "phone": data.display_phone,
        "yelpRating": data.rating.toFixed(1),
        "yelpRatingCount": data.review_count,
        "price": data.price,
        "reviews": [],
        "reviewCount": 0,
        "overall_rating": NaN,
        "latitude": data.coordinates.latitude,
        "longitude": data.coordinates.longitude,
        "distance": data.distance,
        "is_closed": data.is_closed
      };
      filteredData.push(filteredDataItems);
    }
    return filteredData;
  };

  const getCoreBusinessData = (data) => {

    const filteredDataItems = {
      "id": data.id,
      "name": data.name,
      "image": data.image_url,
      "categories": data.categories,
      "address": data.location.address1,
      "city": data.location.city,
      "zip_code": data.location.zip_code,
      "phone": data.display_phone,
      "yelpRating": data.rating.toFixed(1),
      "yelpRatingCount": data.review_count,
      "price": data.price,
      "reviews": [],
      "reviewCount": 0,
      "overall_rating": NaN,
      "latitude": data.coordinates.latitude,
      "longitude": data.coordinates.longitude,
      "distance": data.distance,
      "is_closed": data.is_closed,
      "hours": data.hours,
      "photos": data.photos
    };
    return filteredDataItems;
  };

  const sortBy = (results, property, ascending, type) => {
    return new Promise((res, rej) => {
      let filteredCopy = [];
      if (ascending) {
        filteredCopy = results.sort((a, b) => {
          if (isFinite(a[property] - b[property])) {
            return a[property] - b[property];
          } else {
            return isFinite(a[property]) ? -1 : 1;
          }
        });
      } else if (property === 'date') {
        filteredCopy = results.sort((a, b) => {
          const leftP = new Date(a[property]).getTime();
          const rightP = new Date(b[property]).getTime();
          if (isFinite(rightP - leftP)) {
            return rightP - leftP;
          } else {
            return isFinite(leftP) ? -1 : 1;
          }
        });
      } else {
        filteredCopy = results.sort((a, b) => {
          if (isFinite(b[property] - a[property])) {
            return b[property] - a[property];
          } else {
            return isFinite(a[property]) ? -1 : 1;
          }
        });
      }
      if (type === 'search')
        res(setResults(filteredCopy));
      else if (type === 'review')
        res(setBusinessDetails({ ...businessDetails, reviews: [...filteredCopy] }));
    });
  };


  const addReview = (query, reviews) => {

    query.forEach((result, index) => {
      let ratingSum = 0;
      for (const review of reviews) {
        if (review.venue_id === result.id) {
          query[index].reviews.unshift(review);
          query[index].reviewCount++;
          ratingSum += Number(review.overall_rating);
        }
      }
      if (query[index].reviewCount > 0) {
        query[index].overall_rating = (ratingSum / query[index].reviewCount).toFixed(1);
      }
    });
    return query;
  };

  // function to get all business details        
  const yelpSearch = (venue, location) => {
    resetResults();
    setYelpLoading(true);
    let reviewArr = [];
    return Promise.all([
      axios.post('/api/yelp/search', { venue, location }),
      axios.get('/api/reviews')
    ]).then((all) => {
      const yelpData = all[0].data;
      const parsedYelpData = getCoreYelpData(yelpData);
      all[1].data.forEach((data) => {
        reviewArr.push(data);
      });
      const yelpDataWithReviews = addReview(parsedYelpData, reviewArr);
      const sortedByRating = yelpDataWithReviews.sort((a, b) => {
        if (isFinite(b['overall_rating'] - a['overall_rating'])) {
          return b['overall_rating'] - a['overall_rating'];
        } else {
          return isFinite(a['overall_rating']) ? -1 : 1;
        }
      });
      setYelpLoading(false);
      return setResults(sortedByRating);
    })
      .catch((err) => {
        console.log(err);
      });
  };

  // function to get individual business details

  const getIndividualBusinessData = (id) => {
    let orderedReviews = [];
    let ratingSum = 0;
    return Promise.all([
      axios.post(`/api/yelp/search/${id}`),
      axios.post(`/api/reviews/${id}`)
    ]).then(all => {
      const businessData = all[0].data;
      const parsedBusinessData = getCoreBusinessData(businessData);
      all[1].data.forEach(review => {
        parsedBusinessData.reviewCount++;
        ratingSum += Number(review.overall_rating);
        orderedReviews.unshift(review);
      });
      const overall_rating = (ratingSum / orderedReviews.length).toFixed(1);
      parsedBusinessData.reviews = orderedReviews;
      parsedBusinessData.overall_rating = overall_rating;
      return setBusinessDetails(...[parsedBusinessData]);
    });
  };

  const submitNewReview = (username, venue_id, cleanliness, socialDistancing, transactionProcess, overall_rating, description, venue_name, profile_pic) => {
    return axios.post('/api/reviews/new', {
      username,
      venue_id,
      cleanliness,
      socialDistancing,
      transactionProcess,
      overall_rating,
      description,
      venue_name
    })
      .then(review => {
        if (review.data === "can't make another review for the same venue") {
          return null;
        }
        const updatedBusinessDetails = { ...businessDetails };
        if (isNaN(updatedBusinessDetails.overall_rating)) {
          updatedBusinessDetails.overall_rating = review.data[0].overall_rating;
        } else {
          updatedBusinessDetails.overall_rating = (updatedBusinessDetails.overall_rating * updatedBusinessDetails.reviewCount + Number(review.data[0].overall_rating)) / (updatedBusinessDetails.reviewCount + 1);
        }
        review.data[0].profile_pic = profile_pic || '';
        review.data[0].username = username || '';
        updatedBusinessDetails.reviews.unshift(review.data[0]);
        updatedBusinessDetails.reviewCount++;
        setBusinessDetails(updatedBusinessDetails);
        const searchResults = [...results];
        const updatedSearchResults = searchResults.map(venue => {
          if (venue.id === venue_id) {
            const updatedVenue = { ...venue };
            if (isNaN(updatedVenue.overall_rating)) {
              updatedVenue.overall_rating = review.data[0].overall_rating;
            } else {
              updatedVenue.overall_rating = (updatedVenue.overall_rating * updatedVenue.reviewCount + Number(review.data[0].overall_rating)) / (updatedVenue.reviewCount + 1);
            }
            updatedVenue.reviews.unshift(review.data[0]);
            updatedVenue.reviewCount++;
            return updatedVenue;
          } else {
            return venue;
          }
        });
        setResults(updatedSearchResults);
        return review;
      });
  };

  const wipeBusinessPage = () => {
    setBusinessDetails(initBusiness);
  }

  return {
    results,
    setResults,
    yelpSearch,
    businessDetails,
    setBusinessDetails,
    loadingSearch,
    submitNewReview,
    setLoadingSearch,
    getIndividualBusinessData,
    sortBy,
    yelpLoading,
    setYelpLoading,
    resetResults,
    wipeBusinessPage
  };
}