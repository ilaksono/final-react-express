import React from "react";
import "./Search.scss";
import Venue from "components/Search/Venue/Venue";
import Location from "components/Search/Location/Location";
import Button from "components/Button/Button";

const Search = props => {  
  return (
    <div className="search-container">
      <Venue />
      <Location />
      <Button message={props.buttonMessage} search />
    </div>
  )
};

export default Search;