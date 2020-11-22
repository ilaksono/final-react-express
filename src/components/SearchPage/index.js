import 'styles/SearchPage.scss';
import { useContext, useState, useEffect } from 'react';
import FilterBar from "./Filter/FilterBar";
import Results from "./Results";
import Map from "./Map";
import { YelpContext } from 'YelpContext.js';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';


const SearchPage = props => {
  const { filters, toggleFilterShow } = useContext(YelpContext);
  return (
    <div className="search-page-layout">
      {window.pageYOffset < 150 && 
      <Button name='toggle'
        className='show-filters'
        endIcon={<Icon>send</Icon>}
        value='toggle-switch'
        onClick={toggleFilterShow}
        style={{ position: 'fixed',
        fontSize: 10
       }}
        variant="outlined"
        color="primary"
      > All </Button>}
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