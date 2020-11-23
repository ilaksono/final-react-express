import PlaceListItem from "./PlaceListItem";
import "styles/PlaceListItem.scss";
import { YelpContext } from 'YelpContext';
import { useContext, useEffect } from "react";


const PlaceList = (props) => {
  const { refinedResults,
    hoverMarker,
    notHoverMarker,
    results,
    loadingSearch,
    setLoadingSearch
  } = useContext(YelpContext);
  
  useEffect(() => {
    props.setMaxPageNumber(Math.ceil(refinedResults.length / props.resultsPerPage));
  }, [refinedResults]);

  const indexOfLastResult = props.currentPage * props.resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - props.resultsPerPage;
  const currentResults = refinedResults.slice(indexOfFirstResult, indexOfLastResult);

  const placeList = currentResults.map((place, index) => {
    return <PlaceListItem {...place}
      hoverMarker={hoverMarker}
      notHoverMarker={notHoverMarker}
      label={((props.currentPage - 1) * props.resultsPerPage) + index + 1}
    />;
  });

  
  return (
    <div className='articles-container'>
      {placeList}
    </div>
  );
};

export default PlaceList;
