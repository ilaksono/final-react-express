import PlaceListItem from "./PlaceListItem";
import { YelpContext } from 'YelpContext';
import { useContext, useEffect } from "react";


const PlaceList = (props) => {
  const { refinedResults,
    hoverMarker,
    notHoverMarker,
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
      key={index}
      label={((currentPage - 1) * resultsPerPage) + index + 1}
    />;
  });

  
  return (
    <div className='articles-container'>
      { currentResults.length > 0 ? placeList : (
        <div className="no-search-container">
          There were no results found for that search
        </div>
      )}
    </div>
  );
};

export default PlaceList;
