import React from "react";
import 'styles/Venue.scss';

const Venue = props => {  
  return (
    <div className="venue-container">
      <input type='text' value={props.venue} 
      onClick={event => 
      props.onClick(event.target.value)} 
      className="venue-search-bar" 
      default="" 
      placeholder="Restaurants, parks, Max's" 
      onChange={event => 
      props.onChange(event.target.value)} />
    </div>
  );

};

export default Venue;