import {useState} from "react";
import 'styles/Search.scss';
import Venue from "components/Search/Venue/";
import Location from "components/Search/Location/";
import Button from "components/Button/";
import axiosRegister from "axios/register";


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
        
  const handleSearch = (results) => {
    props.yelpSearch(venue, location)
      .then(() => {
        const { setRefinedSeed } = props;
        setRefinedSeed([...props.results]);
      });
    };
   

  return (
    <div className="search-container">
      <Venue venue={venue} onChange={setVenue}/>
      <Location location={location} onChange={setLocation} />
      <Button onClick={() => handleSearch(props.results)} message={props.buttonMessage} search />
    </div>
  );
};

export default Search;