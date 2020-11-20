import { useState, useEffect, useContext } from "react";
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
  const [location, setLocation] = useState("");
  const [venue, setVenue] = useState("");
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [autoCompleteClicked, setAutoCompleteClicked] = useState(false);
  const { 
    setRefinedSeed,
    results,
    appState,
    yelpSearch,
    autoComplete,
    resetAutoComplete,
    yelpAutoComplete } = useContext(YelpContext);

  // function validate() {
  //   if (location == "") {

  //   }
  // }

  // function reset() {
  //   // resets the text data

  // }
  useEffect(() => {
    setRefinedSeed(results);
    // eslint-disable-next-line
  }, [results]);

  useEffect(() => {
    handleSearch();
    setAutoCompleteClicked(false);
  }, [autoCompleteClicked]);

  const setVenueAndHandleSearch = (text) => {
    setAutoCompleteFalse();
    setAutoCompleteClicked(true);
    setVenue(text, handleSearch);
  }

  const setVenueAndAutoComplete = (text) => {
    if (text === "") {
      resetAutoComplete();
    }
    if (text !== "") {
      yelpAutoComplete(text, appState.center.lat, appState.center.lng);
    }
    setVenue(text);
    setAutoCompleteTrue();
  }

  const setAutoCompleteFalse = () => {
    setShowAutoComplete(false);
  }

  const setAutoCompleteTrue = () => {
    setShowAutoComplete(true);
  }

  const handleSearch = () => {
    console.log("value of venue", venue);
    yelpSearch(venue, location);
  };

  return (
    <div className="search-container">
      <Venue venue={venue} onChange={setVenueAndAutoComplete} onClick={setAutoCompleteTrue} />
      { showAutoComplete && 
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