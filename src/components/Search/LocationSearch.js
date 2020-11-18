import React from "react";
import "./LocationSearch.scss";

const LocationSearch = props => {  
  return (
    <div>
      <input type='text' className="location-search-bar" placeholder="Toronto" />
      <div className='results-container'>
      </div>
    </div>
  );

};

export default LocationSearch;