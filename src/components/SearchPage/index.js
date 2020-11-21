import 'styles/SearchPage.scss';
import { useContext } from 'react';
import FilterBar from "./Filter/FilterBar";
import Results from "./Results";
import Map from "./Map";
import { YelpContext } from 'YelpContext.js';
import Button from '@material-ui/core/Button';


const SearchPage = props => {
  const { filters, toggleFilterShow } = useContext(YelpContext);
  return (
    <div className="search-page-layout">
      <Button name='toggle' 
      className='show-filters' 
      value='toggle-switch' 
      checked='false' 
      onClick={toggleFilterShow}
      color='primary'
      variant='outlined'
      style={{position: 'fixed'}}
      >Show Filters</Button>
      {filters.show &&
      <FilterBar
      />
      }
      <Results />
      <Map />
    </div>
  );
};

export default SearchPage;
// {/* <Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} /> */}