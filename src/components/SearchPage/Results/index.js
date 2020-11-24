import PlaceList from './PlaceList';
import 'styles/Results.scss';
import React, { useContext, useEffect } from 'react';
import { YelpContext } from 'YelpContext';
import Sort from 'components/Sort';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from '@material-ui/lab/Pagination';

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
  const classes = useStyles();
  const {
    loadingSearch,
    sortBy,
    results,
    setRefinedSeed,
    addResults,
    maxPageNumber,
    handlePageChange
  } = useContext(YelpContext);

  const handleSort = (property) => {
    sortBy(results, property, false, 'search')
      .then(() => {
        setRefinedSeed(results);
        addResults(results);
      });
  };

  return (
    <div className='results-container'>
      {loadingSearch ? (
        <div className='progress-bar-container'>
          <div className="progress-bar-container">
            <CircularProgress size={110} disableShrink/>
          </div>
        </div>
      ) : (
          <div className="articles-pagination-container">
            <div className="search-title-container">
              <h2>Search Results</h2>
              <Sort sortOptions={sortOptions}
                defaultOption={sortOptions[0].id}
                onClick={handleSort}
              />
            </div>
            <PlaceList />
            <div className="pagination-container">
              <div className={classes.root}>
                <Pagination count={maxPageNumber} color="primary" onChange={handlePageChange} />
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Results;