import PlaceListItem from "./PlaceListItem";
import "styles/PlaceListItem.scss";
import Sort from 'components/Sort';
import { YelpContext } from 'YelpContext';
import { useContext } from "react";

const sortOptions = [
  {
    id: "comfort_rating",
    value: "Comfort Rating",
    default: true
  },
  {
    id: "number_of_reviews",
    value: "Number Of Reviews",
    default: false
  },
  {
    id: "yelp_rating",
    value: "Yelp Rating",
    default: false
  }
];

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
    <div>
      <div className="search-title-container">
        <h2>Search Results</h2>
        <Sort sortOptions={sortOptions} defaultOption={sortOptions[0].id} />
      </div>
      {placeList}
    </div>
  );
};

export default PlaceList;
