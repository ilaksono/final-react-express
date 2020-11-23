import 'styles/SearchPage.scss';
import { useContext, useState, useEffect } from 'react';
import FilterBar from "./Filter/FilterBar";
import Results from "./Results";
import Map from "./Map";
import { YelpContext } from 'YelpContext.js';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const RESULTS_PER_PAGE = 5;

const SearchPage = props => {
  const { filters, toggleFilterShow } = useContext(YelpContext);
  const [scroll, setScroll] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageNumber, setMaxPageNumber] = useState(1);


  useEffect(() => {
    const a = window.addEventListener('scroll', (event) => {
      setScroll(window.pageYOffset)
    })

    return window.removeEventListener('scroll', a);
  }, [])


  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  }

  return (
    <div className="search-page-layout">
      {scroll < 150 && 
      <Button name='toggle'
        className='show-filters'
        endIcon={<Icon>send</Icon>}
        value='toggle-switch'
        onClick={toggleFilterShow}
        style={{ position: 'fixed',
        fontSize: 10,
        borderRadius: 20
       }}
        variant="outlined"
        color="primary"
      > Filter </Button>}
      {filters.show &&
        <FilterBar
        />
      }
      <Results currentPage={currentPage} resultsPerPage={RESULTS_PER_PAGE} setMaxPageNumber={setMaxPageNumber} maxPageNumber={maxPageNumber} handlePageChange={handlePageChange} />
      <Map currentPage={currentPage} resultsPerPage={RESULTS_PER_PAGE} />
    </div>
  );
};

export default SearchPage;
// {/* <Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} /> */}