import { useState, useEffect, useContext } from "react";
import 'styles/Search.scss';
import Venue from "components/Search/Venue/";
import VenueAutoComplete from "components/Search/VenueAutoComplete/";
import Location from "components/Search/Location/";
import Button from "components/Button/";
import 'styles/Venue.scss';
import 'styles/Location.scss';
import { YelpContext } from 'YelpContext.js';
import { Link, useHistory } from 'react-router-dom';
import 'styles/Home.scss';
import usePlacesAutocomplete from 'use-places-autocomplete';


const Search = props => {
  const history = useHistory();
  const {
    results,
    appState,
    yelpSearch,
    autoComplete,
    resetAutoComplete,
    yelpAutoComplete,
    resetFilters,
    populateCategories,
    addResults,
    getPriceFilterMode,
    setLoadingSearch,
    handlePageChange,
    isLoaded
  } = useContext(YelpContext);
  const [venue, setVenue] = useState("");
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  // const [location, setLocation] = useState('')
  const { ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions } = usePlacesAutocomplete({
      requestOptions: {
        location: {
          lat: () => appState.center.lat,
          lng: () => appState.center.lng
        },
        radius: 200 * 1000,
      },
      debounce: 200,
      defaultValue: appState.center.city || ''
    });
  // function validate() {
  //   if (location == "") {

  //   }
  // }
  useEffect(() => {
    setValue(appState.center.city, false);
  }, [appState]);

  // useEffect(() => {
  //   setLocation(appState.center.city)
  // }, [appState])

  // function reset() {
  //   // resets the text data

  // // }
  useEffect(() => {
    populateCategories(results);
    addResults(results);
    getPriceFilterMode(results);
    // setRefinedSeed(results);
    // eslint-disable-next-line
  }, [results]);

  const setVenueAndHandleSearch = (text) => {
    setVenue(text);
    setAutoCompleteFalse();
    handleSearch(text);
    history.push('/search');
  };

  const setVenueAndAutoComplete = (text) => {
    if (text === "") {
      resetAutoComplete();
    }
    if (text !== "") {
      resetAutoComplete();
      yelpAutoComplete(text, appState.center.lat, appState.center.lng);
    }
    setVenue(text);
    setAutoCompleteTrue();
  };

  const setAutoCompleteFalse = () => {
    setShowAutoComplete(false);
  };

  const setAutoCompleteTrue = () => {
    setShowAutoComplete(true);
  };

  const handleSearch = (name) => {
    setLoadingSearch(true);
    if (name) {
      yelpSearch(name, value); // value = location
    } else {
      yelpSearch(venue, value); // value = location
    }
    handlePageChange(null, 1);
    resetFilters();
  };


  return (
    <div className={props.isHome ? 'home-search' : "search-container"}>
      <Venue venue={venue} onChange={setVenueAndAutoComplete} onClick={setVenueAndAutoComplete}
        isHome={props.isHome} />
      {showAutoComplete &&
        <VenueAutoComplete
          data={autoComplete}
          setAutoCompleteFalse={setAutoCompleteFalse}
          onClick={setVenueAndHandleSearch}
          isHome={props.isHome}
        />
      }
      <Location
        ready={ready}
        value={value}
        status={status}
        data={data}
        // location={location}
        // setLocation={setLocation}
        setValue={setValue}
        clearSuggestions={clearSuggestions}
        appState={appState}
        isHome={props.isHome}

      />
      <Link to={'/search'}>
        <Button onClick={() => handleSearch()} message={props.buttonMessage} search isHome={props.isHome} />
      </Link>
    </div>
  );
};

export default Search;