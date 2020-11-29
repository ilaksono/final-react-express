import PlaceList from './PlaceList';
import React, { useContext } from 'react';
import { YelpContext } from 'YelpContext';
import Sort from 'components/Sort';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from '@material-ui/lab/Pagination';
import { Button } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const sortOptions = [
  {
    id: "overall_rating",
    value: "Safe Score"
  },
  {
    id: "reviewCount",
    value: "Number Of Reviews"
  },
  {
    id: "yelpRating",
    value: "Yelp Rating"
  }
];

const Results = props => {
  const history = useHistory();
  const classes = useStyles();
  const {
    loadingSearch,
    sortBy,
    results,
    addResults,
    maxPageNumber,
    handlePageChange,
    applyPriceFilter,
    currentPage,
    refinedResults,
    loadToxic,
    appState,
    filters
  } = useContext(YelpContext);


  const handleSort = (property) => {
    sortBy(results, property, false, 'search')
      .then(() => {

        applyPriceFilter(filters, results);
        addResults(results);
      });
  };

  return (
    <div className='results-container'>
      {
        history.length > 0 &&
        <div style={{
          position: 'fixed',
          zIndex: '7',
          top: '85px',
          left: `${filters.show ? 'calc((100% - 350px) * 0.3)' : '60px'}`
        }}>
          <Button variant="contained"
            onClick={() => history.goBack()}>
            <KeyboardBackspaceIcon />
          </Button>
        </div>
      }
      {(results.length < 2 && !loadingSearch && appState.searchCount < 1 && refinedResults.length < 2 && filters.categories.length < 2 && !loadToxic) &&
        <div className='begin-your-search'>
          Begin Your Search
      </div>

      }
      {loadingSearch ? (
        <div className='progress-bar-container'>
          <div className="progress-bar-container">
            <CircularProgress size={110} disableShrink />
          </div>
        </div>
      ) : (
          <div className="articles-pagination-container">
            <div className="search-title-container">
              <h2 className='search-title-text'>Search Results</h2>
              <Sort sortOptions={sortOptions}
                defaultOption={sortOptions[0].id}
                onClick={handleSort}
              />
            </div>
            <PlaceList />
            <div className="pagination-container">
              <div className={classes.root}>
                <Pagination count={maxPageNumber} page={currentPage} color="primary" onChange={handlePageChange} />
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Results;