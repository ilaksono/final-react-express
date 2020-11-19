import 'styles/SearchPage.scss';
import useFilter from 'hooks/useFilter';
import FilterBar from "./Filter/FilterBar";
import Results from "./Results/Results";
import Map from "./Map";

const SearchPage = props => {  
  const {filters, filterClick} = useFilter();


  return (
    <div className="search-page-layout">
        <FilterBar filters={filters} 
        applyPriceFilter={props.applyPriceFilter} 
        filterClick={filterClick}
        applyAllFilters={props.applyAllFilters}
        setRefinedSeed={props.setRefinedSeed}
        results={props.results}
        />
        <Results refinedResults={props.refinedResults} />
        <Map mapState={props.mapState} />
    </div>
  );
};

export default SearchPage;