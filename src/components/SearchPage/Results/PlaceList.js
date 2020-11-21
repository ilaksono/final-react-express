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
