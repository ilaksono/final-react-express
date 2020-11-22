import { useState, useEffect } from "react";
import axios from 'axios';
import BusinessPage from "../components/BusinessPage/index";
import { Link } from 'react-router-dom';


export default function useYelpData() {


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
        "price": data.price,
        "reviews": [],
        "reviewCount": 0,
        "overall_rating": "N/A",
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
    let filteredData = [];
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
        "price": data.price,
        "reviews": [],
        "reviewCount": 0,
        "overall_rating": "N/A",
        "latitude": data.coordinates.latitude,
        "longitude": data.coordinates.longitude,
        "distance": data.distance,
        "is_closed": data.is_closed,
        "hours": data.hours,
        "photos": data.photos
      };
    return filteredDataItems;
  }

  const [results, setResults] = useState([{
    id: '',
    name: '',
    image: '',
    categories: '',
    address: '',
    city: '',
    postal: '',
    phone: "",
    yelpRating: '',
    latitude: 0.0,
    longitude: 0.0,
    distance: '',
    price: '',
    reviews: [],
    reviewCount: 0,
    overall_rating: NaN,
    delivery: false,
    is_closed:''
  }]);

  const [businessDetails, setBusinessDetails ] = useState([{
   id: '',
   name: '',
   image: '',
   address: '',
   city: '',
   postal: '',
   phone: "",
   yelpRating: '',
   latitude: 0.0,
   longitude: 0.0,
   distance: '',
   price: '',
   reviews: [],
   reviewCount: 0,
   overall_rating: NaN,
   delivery: false,
   is_closed:'',
   hours: [],
   photos: [] 
  }])

 

  const addReview = (query, reviews) => {
    let ratingSum = 0;
   query.forEach((result, index) => {
   for (const review of reviews) {
    if (review.venue_id === result.id) {
      query[index].reviews.unshift(review);
      query[index].reviewCount++;
      ratingSum += Number(review.overall_rating);
      }
    }
    if (query[index].reviewCount > 0) {
      console.log("rating sum", ratingSum);
      console.log("count", query[index].reviewCount)
      query[index].overall_rating = (ratingSum / query[index].reviewCount).toFixed(1);
    }
  })/* 
  if (query.review.length) {
    query.reviewCount = query.review.length;
    query.overall_rating = query.reviews.reduce((acc, rating) => acc + rating, 0) / query.reviewCount;
  } */
  return query;
};

   // function to get all business details        
  const yelpSearch = (venue, location) => {
    let reviewArr = [];      
    console.log("yelp search called with", venue, location);
    return Promise.all([
      axios.post('/api/search_yelp', {venue, location}),
      axios.get('/api/reviews')
    ]).then((all) => {
      const yelpData = all[0].data
      const parsedYelpData = getCoreYelpData(yelpData)
      all[1].data.forEach((data) => {
        reviewArr.push(data);
      })
      const yelpDataWithReviews = addReview(parsedYelpData, reviewArr)
      return setResults(yelpDataWithReviews) 
    })
      .catch((err) => {
        console.log(err)
      })
  }

  // function to get individual business details

    const getIndividualBusinessData = (id) => {
      let orderedReviews = []
    return Promise.all([
      axios.post(`/api/search_yelp/${id}`),
      axios.post(`/api/reviews/${id}`)
    ]).then(all => {
      const businessData = all[0].data
      const parsedBusinessData = getCoreBusinessData(businessData);
      all[1].data.forEach(review => {
        orderedReviews.unshift(review)
      })
      parsedBusinessData.reviews = orderedReviews;
      parsedBusinessData.reviewCount = orderedReviews.length;
      let ratingSum = 0;
      for (const review of orderedReviews) {
        ratingSum += Number(review.overall_rating);
      }
      if (orderedReviews.length > 0) {
        parsedBusinessData.overall_rating = (ratingSum / orderedReviews.length).toFixed(1);
      }
      console.log("PARSE", parsedBusinessData);
      return setBusinessDetails(...[parsedBusinessData]); 
    })
  }

  return { results, setResults, yelpSearch, businessDetails, setBusinessDetails, getIndividualBusinessData }
}