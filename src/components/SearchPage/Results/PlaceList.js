import PlaceListItem from "./PlaceListItem";
import "styles/PlaceListItem.scss";
import Sort from 'components/Sort';
import { YelpContext } from 'YelpContext';
import { useContext } from "react";

const sortOptions = [
  {
    id: "overall_rating",
    value: "Comfort Rating",
    default: true
  },
  {
    id: "reviewCount",
    value: "Number Of Reviews",
    default: false
  },
  {
    id: "yelpRating",
    value: "Yelp Rating",
    default: false
  }
];

const PlaceList = (props) => {

  const { refinedResults,
    hoverMarker,
    notHoverMarker,
    sortBy,
    results } 
    = useContext(YelpContext);

  const placeList = refinedResults.map(place => {
    return <PlaceListItem {...place}
      hoverMarker={hoverMarker}
      notHoverMarker={notHoverMarker}
    />;
  });

  const handleSort = (property) => {
    console.log("calling handleSort w property", property, "results", results);
    sortBy(results, property, false);
  }
  

  return (
    <div>
      <div className="search-title-container">
        <h2>Search Results</h2>
        <Sort sortOptions={sortOptions} defaultOption={sortOptions[0].id} onClick={handleSort} />
      </div>
      {placeList}
    </div>
  );
};

export default PlaceList;
