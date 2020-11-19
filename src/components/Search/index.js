import { useState, useEffect } from "react";
import 'styles/Search.scss';
import Venue from "components/Search/Venue/";
import Location from "components/Search/Location/";
import Button from "components/Button/";
import 'styles/Venue.scss';
import 'styles/Location.scss';

const Search = props => {
  const [location, setLocation] = useState("");
  const [venue, setVenue] = useState("");


  // function validate() {
  //   if (location == "") {

  //   }
  // }

  // function reset() {
  //   // resets the text data

  // }
  useEffect(() => {
    props.setRefinedSeed(props.results);
    // eslint-disable-next-line
  }, [props.results]);

  const handleSearch = () => {
    props.yelpSearch(venue, location)
  };
  return (
    <div className="search-container">
      <Venue venue={venue} onChange={setVenue} />
      <Location location={location} onChange={setLocation} />
      <Button onClick={handleSearch} message={props.buttonMessage} search />
    </div>
  );
};

export default Search;