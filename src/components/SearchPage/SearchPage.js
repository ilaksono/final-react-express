import React from "react";
import "./SearchPage.scss";
import useFilter from 'hooks/useFilter';
import FilterBar from "./Filter/FilterBar";
import PlacesResults from "./PlacesResults/PlacesResults";
import Map from "./Map/Map";

const SearchPage = props => {  
  const {filters, filterClick} = useFilter();

  return (
    <div className="search-page-layout">
      <FilterBar filters={filters} filterClick={filterClick}/>
      <PlacesResults />
      <Map mapState={props.mapState} />
    </div>
  )
};

export default SearchPage;