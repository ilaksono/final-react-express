const getCoreYelpData = (yelpData) => {
  let filteredData = [];
  for (const data of yelpData) {
    const filteredDataItems = {
      "id": data.id,
      "name": data.name,
      "image": data.image_url,
      "category": data.categories[0].title,
      "address": data.location.address1,
      "city": data.location.city,
      "zip_code": data.location.zip_code,
      "phone": data.phone,
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
export const mockData = [
  {
    "id": "0W4lkclzZThpx3V65bVgig",
    "alias": "schwartzs-montréal-4",
    "name": "Schwartz's",
    "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/REAW-WtquHDgSs-HWMro-g/o.jpg",
    "is_closed": false,
    "url": "https://www.yelp.com/biz/schwartzs-montr%C3%A9al-4?adjust_creative=iqnuEIVEAHVyqp3-szgKBA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=iqnuEIVEAHVyqp3-szgKBA",
    "review_count": 2697,
    "categories": [
      {
        "alias": "delis",
        "title": "Delis"
      },
      {
        "alias": "sandwiches",
        "title": "Sandwiches"
      }
    ],
    "rating": 4,
    "coordinates": {
      "latitude": 45.516353,
      "longitude": -73.577642
    },
    "transactions": [],
    "price": "$$",
    "location": {
      "address1": "3895 Boulevard Saint-Laurent",
      "address2": "",
      "address3": "",
      "city": "Montreal",
      "zip_code": "H2W 1X9",
      "country": "CA",
      "state": "QC",
      "display_address": [
        "3895 Boulevard Saint-Laurent",
        "Montreal, QC H2W 1X9",
        "Canada"
      ]
    },
    "phone": "+15148424813",
    "display_phone": "+1 514-842-4813",
    "distance": 514.4026575125611
  },
  {
    "id": "J6qWt6XIUmIGFHX5rQJA-w",
    "alias": "l-avenue-montréal",
    "name": "L'Avenue",
    "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/x2LT3Xe670JCXJBxkuIBPg/o.jpg",
    "is_closed": false,
    "url": "https://www.yelp.com/biz/l-avenue-montr%C3%A9al?adjust_creative=iqnuEIVEAHVyqp3-szgKBA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=iqnuEIVEAHVyqp3-szgKBA",
    "review_count": 1150,
    "categories": [
      {
        "alias": "breakfast_brunch",
        "title": "Breakfast & Brunch"
      }
    ],
    "rating": 4.5,
    "coordinates": {
      "latitude": 45.5266781712886,
      "longitude": -73.5802391312828
    },
    "transactions": [],
    "price": "$$",
    "location": {
      "address1": "922 Avenue du Mont-Royal E",
      "address2": "",
      "address3": "",
      "city": "Montreal",
      "zip_code": "H2J 1X2",
      "country": "CA",
      "state": "QC",
      "display_address": [
        "922 Avenue du Mont-Royal E",
        "Montreal, QC H2J 1X2",
        "Canada"
      ]
    },
    "phone": "+15145238780",
    "display_phone": "+1 514-523-8780",
    "distance": 1382.5114013623443
  }
]
export default getCoreYelpData;

