import { useState, useEffect } from "react";
import axios from 'axios';

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
        "latitude": data.coordinates.latitude,
        "longitude": data.coordinates.longitude,
        "distance": data.distance,
        "is_closed": data.is_closed
      };
      filteredData.push(filteredDataItems);
    }
    return filteredData
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
    delivery: false,
    is_closed:''
  }]);

  const yelpSearch = (venue, location) => {
   return axios.post('/api/search_yelp', {venue, location})
    .then((response) => {
      console.log(response);
    const yelpData = response.data;
    const parsedYelpData = getCoreYelpData(yelpData)
    return setResults(parsedYelpData)
  })
  .catch((err) => {
    console.log (err)
    }) 
  }
  
return { results, setResults, yelpSearch }
}