import 'styles/SearchPage.scss';
import { Fragment, useContext, useState, useEffect } from 'react';
import FilterBar from "./Filter/FilterBar";
import Results from "./Results";
import Map from "./Map";
import { YelpContext } from 'YelpContext.js';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const RESULTS_PER_PAGE = 5;

const SearchPage = props => {
  const { filters, toggleFilterShow } = useContext(YelpContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageNumber, setMaxPageNumber] = useState(1);


  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  }

  return (
    <div className="search-page-layout">
      <Button name='toggle'
        className='show-filters'/* 
        endIcon={<Icon>send</Icon>} */
        value='toggle-switch'
        onClick={toggleFilterShow}
        style={{position: 'absolute',
        fontSize: 10,
       }}
        variant="outlined"
        color="primary"
      > Show Filter </Button>
      {filters.show &&
       <>
       <FilterBar
        />
        <div className='filter-spacer'></div>
        </>}
      <Results currentPage={currentPage} resultsPerPage={RESULTS_PER_PAGE} setMaxPageNumber={setMaxPageNumber} maxPageNumber={maxPageNumber} handlePageChange={handlePageChange}/>
      <Map currentPage={currentPage} resultsPerPage={RESULTS_PER_PAGE}/>
      <div className='map-spacer'>
      </div>
    </div>
  );
};

export default SearchPage;
// {/* <Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} /> */}