import React from "react";
import 'styles/Venue.scss';

const Venue = props => {  
  return (
    <div className="venue-container">
      <input type='text' value={props.venue} className="venue-search-bar" placeholder="Restaurants, parks, Max's" onChange={event => props.onChange(event.target.value)} />
    </div>
  );

};

export default Venue;