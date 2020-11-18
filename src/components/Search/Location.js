import React from "react";
import "./Location.scss";

const Location = props => {  
  return (
    <div>
      <input type='text' className="location-search-bar" placeholder="Toronto" />
      <div className='results-container'>
      </div>
    </div>
  );

};

export default Location;