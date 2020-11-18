import React from "react";
import 'styles/Venue.scss';

const Venue = props => {  
  return (
    <div className="venue-container">
      <input type='text' className="venue-search-bar" placeholder="Restaurants, parks, Max's"/>
    </div>
  );

};

export default Venue;