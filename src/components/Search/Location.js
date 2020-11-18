import React from "react";
import 'styles/Location.scss';

const Location = props => {  
  return (
    <div className="location-container">
      <input type='text' className="location-search-bar" placeholder="Toronto" />
    </div>
  );

};

export default Location;