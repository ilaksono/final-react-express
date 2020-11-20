import { useState, useEffect } from "react";
import axios from 'axios';

export default function useYelpData() {

  const REVIEWS_DATA = '/api/reviews';

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

   const addReviewCount = (query, reviews) => {
    query.forEach((result, index) => {
    for (const review of reviews) {
        if (review.venue_id === result.id) {
          query[index].reviews.push(review)
        }
      }
    })
  return query
};
            
  const yelpSearch = (venue, location) => {
    
    let reviewArr = [];
          
    return Promise.all([
      axios.post('/api/search_yelp', {venue, location}),
      axios.get(REVIEWS_DATA)
    ]).then((all) => {
      const yelpData = all[0].data
      const parsedYelpData = getCoreYelpData(yelpData)
      all[1].data.forEach((data) => {
        reviewArr.push(data)
      })
      const yelpDataWithReviews = addReviewCount(parsedYelpData, reviewArr)
      return setResults(yelpDataWithReviews) 
    })
      .catch((err) => {
        console.log(err)
      })
  }
  
return { results, setResults, yelpSearch }
}