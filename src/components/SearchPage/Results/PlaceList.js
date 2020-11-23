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
    setLoadingSearch,
    currentPage,
    setMaxPageNumber,
    resultsPerPage,
  } = useContext(YelpContext);
  
  useEffect(() => {
    setMaxPageNumber(Math.ceil(refinedResults.length / resultsPerPage));
  }, [refinedResults]);

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = refinedResults.slice(indexOfFirstResult, indexOfLastResult);

  const placeList = currentResults.map((place, index) => {
    return <PlaceListItem {...place}
      hoverMarker={hoverMarker}
      notHoverMarker={notHoverMarker}
      label={((currentPage - 1) * resultsPerPage) + index + 1}
    />;
  });

  
  return (
    <div className='articles-container'>
      {placeList}
    </div>
  );
};

export default PlaceList;
