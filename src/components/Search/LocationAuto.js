import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const LocationAuto = props => {


  // const debounced = useDebounce()
  // useEffect(() => { 
  // setValue(props.appState.center.city);
  // eslint-disable-next-line
  // }, [props.appState]);
  const cls = `${props.isHome === true ? "home-autocomplete-container" : "venue-autocomplete-container"}`;

  return (
    <>
      <Combobox 
      style={{
          fontFamily: 'Montserrat'
      }}
      onSelect={add => {
        props.setValue(add, false);
        props.clearSuggestions();
      }}
      >
        <ComboboxInput value={props.value}
          onChange={e => {
            props.getPlacesAuto(e.target.value);
            props.setValue(e.target.value);
          }}
          className={`${props.isHome ? 'home-search-l' : 'location-search-bar'}`}
          disabled={false}
          placeholder="city, region, province"
        />
        <ComboboxPopover style={{zIndex: 10}}>
          
          {props.loc && props.loc.suggest.map(({place_id, description}) => 
            <ComboboxOption key={place_id} value={description}>
              </ComboboxOption>
          )

        }

        </ComboboxPopover>

      </Combobox>
    </>
  );
};

export default LocationAuto; 


// { (props.status === 'OK' && props.appState.center.city !== props.value && props.ready) && 

//  props.data.map
//  (({ id, description }) =>
//    <ComboboxOption key={id} value={description}>
//
//    </ComboboxOption>)}