import { useCallback, useState, useEffect, useContext } from "react";
import 'styles/Search.scss';
import Venue from "components/Search/Venue/";
import VenueAutoComplete from "components/Search/VenueAutoComplete/";
import Location from "components/Search/Location/";
import Button from "components/Button/";
import 'styles/Venue.scss';
import 'styles/Location.scss';
import { YelpContext } from 'YelpContext.js';
import { Link } from 'react-router-dom';

const Search = props => {
  const {
    setRefinedSeed,
    results,
    appState,
    yelpSearch,
    autoComplete,
    resetAutoComplete,
    yelpAutoComplete,
    resetFilters,
    getBrowserLocation,
    populateCategories,
    addResults,
    getPriceFilterMode,
    setCategoriesSelected,
    populateCenter,
    panTo
  } = useContext(YelpContext);
  const [location, setLocation] = useState("");
  const [venue, setVenue] = useState("");
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [autoCompleteClicked, setAutoCompleteClicked] = useState(false);

  // function validate() {
  //   if (location == "") {

  //   }
  // }

  // function reset() {
  //   // resets the text data

  // // }
  useEffect(() => {
    populateCategories(results);
    addResults(results);
    getPriceFilterMode(results);
    setRefinedSeed(results);
    // eslint-disable-next-line
  }, [results]);

  useEffect(() => {
    setLocation(appState.center.city);
  }, [appState]);

  useEffect(() => {
    handleSearch();
    setAutoCompleteClicked(false);
    // eslint-disable-next-line
  }, [autoCompleteClicked]);

  const setVenueAndHandleSearch = (text) => {
    setVenue(text);
    setAutoCompleteFalse();
    handleSearch();
    setAutoCompleteClicked(true);
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

  const handleSearch = () => {
    console.log("calling search with ", venue);
    yelpSearch(venue, location);

  };

  return (
    <div className="search-container">
      <Venue venue={venue} onChange={setVenueAndAutoComplete} onClick={setVenueAndAutoComplete} />
      {showAutoComplete &&
        <VenueAutoComplete
          data={autoComplete}
          setAutoCompleteFalse={setAutoCompleteFalse}
          onClick={setVenueAndHandleSearch}
        />
      }
      <Location location={location} onChange={setLocation} />
      <Link to={'/search'}>
        <Button onClick={handleSearch} message={props.buttonMessage} search />
      </Link>
    </div>
  );
};

export default Search;