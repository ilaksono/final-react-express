const yelp = require('yelp-fusion');

const getCoreYelpData = (yelpData) => {
  let filteredData = [];
  for (const data of yelpData) {
    const filteredDataItems = {
      "id": data.id,
      "name": data.name,
      "image": data.image_url,
      "category": data.categories,
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

const apiKey = '';
const searchRequest = {
  location: 'montreal, qc',
  limit: 1,
};
const client = yelp.client(apiKey);
client.search(searchRequest).then(response => {
  const yelpData = response.jsonBody.businesses;
  const parsedYelpData = getCoreYelpData(yelpData)
  console.log(parsedYelpData)
}).catch(e => {
  console.log(e);
});