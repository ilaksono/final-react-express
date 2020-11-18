import { useState } from "react";
const yelp = require('yelp-fusion');
// Place holder for Yelp Fusion's API Key. Grab the
// from https://www.yelp.com/developers/v3/manage_app
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
        "latitude": data.coordinates.latitude,
        "longitude": data.coordinates.longitude,
        "price": data.price,
        "distance": data.distance
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
    price: '',
    distance: '',
    delivery: false
  }]);

  const apiKey = 'EkoF1-eKSzhwegJB-UG8DqUOXkQm8WtEgwt9AMT4AG2eCzNWb5dkGKReVK0aA2MAUvDO2MZBnVLdHHFkuAKDMCDKrHytgMM-dOJFGSs9-T41qYcdo-NH-mpW6_SxX3Yx';
  const searchRequest = {
    location: 'montreal, qc',
    limit: 2,
  };
  const client = yelp.client(apiKey);
  client.search(searchRequest).then(response => {
    const yelpData = response.jsonBody.businesses;
    const parsedYelpData = getCoreYelpData(yelpData)
    parsedYelpData.map(data => {
      setResults([...{
        id:data.id,
        name: data.name,
        image: data.image,
        categories: data.categories,
        address: data.address,
        city: data.city,
        postal: data.zip_code,
        phone: data.phone, 
        yelpRating: data.yelpRating,
        latitude: data.latitude,
        longitude: data.longitude,
        price: data.price,
        distance: data.distance,
        delivery: true,
      }])
    })
  }).catch(e => {
    console.log(e);
  });

  return {results, setResults}
}
  