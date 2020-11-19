import React from "react";
import 'styles/SearchPage.scss';
import useFilter from 'hooks/useFilter';
import FilterBar from "./Filter/FilterBar";
import Results from "./Results/Results";
import Map from "./Map/Map";

const SearchPage = props => {  
  const {filters, filterClick} = useFilter();


  return (
    <div className="search-page-layout">
      <FilterBar filters={filters} filterClick={filterClick}/>
      <Results refinedResults={props.refinedResults}/>
      <Map mapState={props.mapState} />
    </div>
  )
};

export default SearchPage;