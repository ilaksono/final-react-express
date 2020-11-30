import React from "react";

const Venue = props => {

  return (
    <div className={`${props.isHome ? 'home-search-v-container' :'venue-container'}`}>
      {props.isHome && <div className='search-prompt'>Find</div>}
      <input type='text' value={props.venue} 
      onClick={event => 
      props.onClick(event.target.value)} 
        className={`${props.isHome ? 'home-search-v': "venue-search-bar"}`} 
      default="" 
      placeholder="Restaurants, parks, Max's" 
      onChange={event => 
      props.onChange(event.target.value)} 
     
      />
    </div>
  );

};

export default Venue;