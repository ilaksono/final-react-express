import { useState, useEffect, useContext } from "react";
import 'styles/Search.scss';
import Venue from "components/Search/Venue/";
import Location from "components/Search/Location/";
import Button from "components/Button/";
import 'styles/Venue.scss';
import 'styles/Location.scss';
import { YelpContext } from 'YelpContext.js';
import { Link } from 'react-router-dom';

const Search = props => {
  const [location, setLocation] = useState("");
  const [venue, setVenue] = useState("");
  const {
    setRefinedSeed,
    results,
    yelpSearch,
    resetFilters,
    populateCategories } = useContext(YelpContext);

  // function validate() {
  //   if (location == "") {

  //   }
  // }

  // function reset() {
  //   // resets the text data

  // }
  useEffect(() => {
    setRefinedSeed(results);
    populateCategories(results);
    
    // eslint-disable-next-line
  }, [results]);

  const handleSearch = () => {
    yelpSearch(venue, location);
    resetFilters();
  };
  return (
    <div className="search-container">
      <Venue venue={venue} onChange={setVenue} />
      <Location location={location} onChange={setLocation} />
      <Link to={'/search'}>
        <Button onClick={handleSearch} message={props.buttonMessage} search />
      </Link>
    </div>
  );
};

export default Search;