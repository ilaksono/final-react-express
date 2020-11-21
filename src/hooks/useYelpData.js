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
        "yelpRating": data.rating,
        "price": data.price,
        "reviews": [],
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
        "yelpRating": data.rating,
        "price": data.price,
        "reviews": [],
        "reviewScore": '',
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
   reviewScore: '',
   delivery: false,
   is_closed:'',
   hours: [],
   photos: [] 
  }])

 

  const addReview = (query, reviews) => {
   query.forEach((result, index) => {
   for (const review of reviews) {
    if (review.venue_id === result.id) {
      query[index].reviews.unshift(review)
      }
    }
  })
  return query
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
        reviewArr.push(data)
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
      return setBusinessDetails(...[parsedBusinessData]); 
    })
  }

  return { results, setResults, yelpSearch, businessDetails, setBusinessDetails, getIndividualBusinessData }
}