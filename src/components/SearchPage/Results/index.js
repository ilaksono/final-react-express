import PlaceList from './PlaceList';
import 'styles/Results.scss';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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


  return (
    <div className='results-container'>
      <div className='articles-container'>
        <PlaceList currentPage={props.currentPage} resultsPerPage={props.resultsPerPage} setMaxPageNumber={props.setMaxPageNumber} />
        <div className={classes.root}>
          <Pagination count={props.maxPageNumber} color="primary" onChange={props.handlePageChange} />
        </div>
      </div>
    </div>
  );
}

export default Results;