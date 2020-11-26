import { Fragment, useEffect } from "react";
import 'styles/VenueAutoComplete.scss';
import usePlacesAutocomplete from 'use-places-autocomplete';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";


const LocationAuto = props => {


  // useEffect(() => { 
  // setValue(props.appState.center.city);
  // eslint-disable-next-line
  // }, [props.appState]);
  const cls = `${props.isHome === true ? "home-autocomplete-container" : "venue-autocomplete-container"}`;

  return (
    <>
      <Combobox onSelect={add => {
        props.setValue(add, false);
        props.clearSuggestions();
      }}
      >
        <ComboboxInput value={props.value}
          onChange={e => {
            props.setValue(e.target.value);
          }}
          className={`${props.isHome ? 'home-search-l' : 'location-search-bar'}`}
          disabled={false}
          placeholder="Toronto"
        />
        <ComboboxPopover style={{zIndex: 10}}>
          {(props.status === 'OK'&& props.appState.center.city !== props.value && props.ready)&& 
          props.data.map
              (({ id, description }) =>
                <ComboboxOption key={id} value={description}>

                </ComboboxOption>)}
        </ComboboxPopover>

      </Combobox>
    </>
  );
};

export default LocationAuto;