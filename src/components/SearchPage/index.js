import 'styles/SearchPage.scss';
import useFilter from 'hooks/useFilter';
import FilterBar from "./Filter/FilterBar";
import Results from "./Results";
import Map from "./Map";
// import { Switch } from '@material-ui/core';


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
// {/* <Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} /> */}