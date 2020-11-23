import PlaceList from './PlaceList';
import 'styles/Results.scss';
import React, { useContext } from 'react';
import { YelpContext } from 'YelpContext';
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


const Results = props => {
  const classes = useStyles();
  const { loadingSearch } = useContext(YelpContext);

  return (
    <div className='results-container'>
      { loadingSearch && (
      <div className='progress-bar-container'>
        <div className="progress-bar-container">
          <CircularProgress />
        </div>
      </div>
      )}

      { !loadingSearch && (
      <div className='articles-container'>
        <PlaceList currentPage={props.currentPage} resultsPerPage={props.resultsPerPage} setMaxPageNumber={props.setMaxPageNumber} />
        <div className="pagination-container">
          <div className={classes.root}>
            <Pagination count={props.maxPageNumber} color="primary" onChange={props.handlePageChange} />
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default Results;