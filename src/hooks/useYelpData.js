import { useState, useEffect } from "react";
import axios from 'axios';
const yelp = require('yelp-fusion');
// Place holder for Yelp Fusion's API Key. Grab the
// from https://www.yelp.com/developers/v3/manage_app
export default function useYelpData(term = "") {

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
        "distance": data.distance
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
    delivery: false
  }]);


  useEffect(() => {
    axios.get('/api/search_yelp')
      .then((response) => {
        console.log(response);
        const yelpData = response.data.businesses;
        const parsedYelpData = getCoreYelpData(yelpData);
        console.log("This is the parsed data", parsedYelpData);
        setResults(parsedYelpData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [term]);
  return { results, setResults };
}