import 'styles/SearchPage.scss';
import useFilter from 'hooks/useFilter';
import FilterBar from "./Filter/FilterBar";
import Results from "./Results/Results";
import Map from "./Map/Map";
import useRemoveElements from 'hooks/useRemoveElements';

const SearchPage = props => {
  const { filters, filterClick } = useFilter();
  const { removePlaces,
    getRemovedPlaces,
    pushRemovedPlaces } = useRemoveElements();
  return (
    <div className="search-page-layout">
        <FilterBar filters={filters} 
        applyPriceFilter={props.applyPriceFilter} 
        filterClick={filterClick}
        removePlaces={removePlaces}
        getRemovedPlaces={getRemovedPlaces}
        pushRemovedPlaces={pushRemovedPlaces} 
        />
        <Results refinedResults={props.refinedResults} />
        <Map mapState={props.mapState} />
    </div>
  );
};

export default SearchPage;