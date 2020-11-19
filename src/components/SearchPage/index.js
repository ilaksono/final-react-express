import 'styles/SearchPage.scss';
import useFilter from 'hooks/useFilter';
import FilterBar from "./Filter/FilterBar";
import Results from "./Results";
import Map from "./Map";

const SearchPage = props => {  
  return (
    <div className="search-page-layout">
        <FilterBar 
        />
        <Results/>
        <Map/>
    </div>
  );
};

export default SearchPage;