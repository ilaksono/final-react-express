import { useState } from "react";
import axios from 'axios';



export default function useYelpData() {
  const [loadingSearch, setLoadingSearch] = useState(false);

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
   overall_rating: '',
   reviews: [],
   delivery: false,
   is_closed:'',
   hours: [],
   photos: [] 
  }])

 

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
    let reviewArr = [];
    return Promise.all([
      axios.post('/api/search_yelp', {venue, location}),
      axios.get('/api/reviews')
    ]).then((all) => {
      const yelpData = all[0].data
      const parsedYelpData = getCoreYelpData(yelpData)
      all[1].data.forEach((data) => {
        reviewArr.push(data);
      })
      const yelpDataWithReviews = addReview(parsedYelpData, reviewArr);
      const sortedByRating = yelpDataWithReviews.sort((a, b) => {
        if(isFinite(b['overall_rating'] - a['overall_rating'])) {
          return b['overall_rating'] - a['overall_rating'];
        } else {
          return isFinite(a['overall_rating']) ? -1 : 1;
        }
      });

      return setResults(sortedByRating);
    })
      .catch((err) => {
        console.log(err)
      })
  }

  // function to get individual business details

    const getIndividualBusinessData = (id) => {
      let orderedReviews = []
      let ratingSum = 0;
    return Promise.all([
      axios.post(`/api/search_yelp/${id}`),
      axios.post(`/api/reviews/${id}`)
    ]).then(all => {
      const businessData = all[0].data
      const parsedBusinessData = getCoreBusinessData(businessData);
      all[1].data.forEach(review => {
        parsedBusinessData.reviewCount ++
        ratingSum += Number(review.overall_rating)
        orderedReviews.unshift(review)
      });
      const overall_rating = (ratingSum/orderedReviews.length).toFixed(1);
      parsedBusinessData.reviews = orderedReviews;
      parsedBusinessData.overall_rating = overall_rating;
      return setBusinessDetails(...[parsedBusinessData]); 
    })
  }

  return { 
    results,
    setResults,
    yelpSearch,
    businessDetails,
    setBusinessDetails, 
    loadingSearch,
    setLoadingSearch,
    getIndividualBusinessData
  }
}