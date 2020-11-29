import React from "react";
import LocationAuto from './LocationAuto';
const Location = props => {
  return (
    <div className={`${props.isHome ? 'home-search-l-container' : 'location-container'}`}>
      {props.isHome && <div className='search-prompt-l'>Near</div>}
      {/* <input type='text' value={props.location || ''} className={`${props.isHome ? 'home-search-l' :'location-search-bar'}`} placeholder="Toronto" onChange={event => props.onChange(event.target.value)} /> */}
      <LocationAuto
        isHome={props.isHome}
        appState={props.appState}
        ready={props.ready}
        value={props.value}
        status={props.status}
        data={props.data}
        setValue={props.setValue}
        clearSuggestions={props.clearSuggestions}
        getPlacesAuto={props.getPlacesAuto}
        loc={props.loc}
      />
    </div>
  );

};

export default Location;