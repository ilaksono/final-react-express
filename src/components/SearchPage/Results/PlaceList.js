import PlaceListItem from "./PlaceListItem";
import { YelpContext } from 'YelpContext';
import { useContext } from "react";

const PlaceList = (props) => {

  const { refinedResults,
    hoverMarker,
    notHoverMarker } 
    = useContext(YelpContext);

  const placeList = refinedResults.map(place => {
    return <PlaceListItem {...place}
      hoverMarker={hoverMarker}
      notHoverMarker={notHoverMarker}
    />;
  });

  return (
    <div className=''>
      <h2>Search Results</h2>
      <span>Sort By:</span>
      {placeList}
    </div>
  );
};

export default PlaceList;
// const filteredDataItems = {
//       "id": data.id,
//       "name": data.name,
//       "image": data.image_url,
//       "category": data.categories[0].title,
//       "address": data.location.address1,
//       "city": data.location.city,
//       "zip_code": data.location.zip_code,
//       "phone": data.phone,
//       "yelpRating": data.rating,
//       "latitude": data.coordinates.latitude,
//       "longitude": data.coordinates.longitude,
//       "price": data.price,
//       "distance": data.distance
//     };