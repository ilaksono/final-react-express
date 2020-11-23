import React from "react";
import 'styles/Location.scss';
import 'styles/Home.scss';

const Location = props => {  
  return (
    <div className={`${props.isHome ? 'home-search-l-container' : 'location-container'}`}>
      {props.isHome && <div className='search-prompt-l'>Near</div>}
      <input type='text' value={props.location} className={`${props.isHome ? 'home-search-l' :'location-search-bar'}`} placeholder="Toronto" onChange={event => props.onChange(event.target.value)} />
    </div>
  );

};

export default Location;