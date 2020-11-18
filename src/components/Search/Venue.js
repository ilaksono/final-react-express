import React from "react";
import "./Venue.scss";

const Venue = props => {  
  return (
    <div>
      <input type='text' className="venue-search-bar" placeholder="Restaurants, parks, Max's"/>
      <div className='results-container'>
      </div>
    </div>
  );

};

export default Venue;