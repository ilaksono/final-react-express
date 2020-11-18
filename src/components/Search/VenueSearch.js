import React from "react";
import "./VenueSearch.scss";

const VenueSearch = props => {  
  return (
    <div>
      <input type='text' className="venue-search-bar" placeholder="Restaurants, parks, Max's"/>
      <div className='results-container'>
      </div>
    </div>
  );

};

export default VenueSearch;