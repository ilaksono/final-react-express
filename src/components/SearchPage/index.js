import { Fragment, useContext, useState, useEffect } from 'react';
import FilterBar from "./Filter/FilterBar";
import Results from "./Results";
import Map from "./Map";
import { YelpContext } from 'YelpContext.js';
import Button from '@material-ui/core/Button';


const SearchPage = props => {
  const { filters, toggleFilterShow,
    results} = useContext(YelpContext);

  const [showMap, setShowMap] = useState(true);
  useEffect(() => {
    // setRefinedSeed(results);
    // eslint-disable-next-line
  }, [results]);

  return (
    <div className="search-page-layout">
      <Button name='toggle'
        className='show-filters'/* 
        endIcon={<Icon>send</Icon>} */
        value='toggle-switch'
        onClick={toggleFilterShow}
        style={{
          position: 'absolute',
          fontSize: 10,
          fontWeight: 'bold'
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
      <Results />
      <Button name='toggle'
        className='show-map'/* 
        endIcon={<Icon>send</Icon>} */
        value='toggle-switch'
        onClick={() => setShowMap(!showMap)}
        style={{
          position: 'absolute',
          fontSize: 10,
          fontWeight: 'bold',
          right: showMap ? '470px' : '40px'
        }}
        variant="outlined"
        color="primary"
      > {showMap ? 'Hide' : 'Show'} Map </Button>
      {showMap && <Map />}

    </div>
  );
};

export default SearchPage;
// {/* <Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} /> */}