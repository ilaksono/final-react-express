import React from "react";
import 'styles/Location.scss';

const Location = props => {  
  return (
    <div className="location-container">
      <input type='text' value={props.location} className="location-search-bar" placeholder="Toronto" onChange={event => props.onChange(event.target.value)} />
    </div>
  );

};

export default Location;