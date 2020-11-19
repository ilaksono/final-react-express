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
  const { 
    setRefinedSeed,
    results,
    appState,
    yelpSearch,
    autoComplete,
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

  const setVenueAndHandleSearch = (text) => {
    setAutoCompleteFalse();
    setVenuePromise(text)
    .then(() => {
      console.log("value of venue", venue);
      handleSearch();
    })
    .catch(e => console.log(e));
  }

  const setVenueAndAutoComplete = (text) => {
    setVenue(text);
    yelpAutoComplete(text, appState.center.lat, appState.center.lng);
    setAutoCompleteTrue();
  }

  const setAutoCompleteFalse = () => {
    setShowAutoComplete(false);
  }

  const setAutoCompleteTrue = () => {
    setShowAutoComplete(true);
  }

  const setVenuePromise = (text) => {
    return new Promise ((resolve) => {
      resolve(setVenue(text));
    });
  }

  const handleSearch = () => {
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