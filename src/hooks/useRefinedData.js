import { useReducer, useEffect } from 'react';
import getCoreYelpData, { mockData } from 'helpers/data_filter.js';
import axios from "axios";

// reducer constants
const SEED = 'SEED';
const SORT = 'SORT'; // can also be sort by x
const PRICE_FILTER = 'PRICE_FILTER';
const DIST_FILTER = 'DIST_FILTER';
const ADD_REVIEWS = 'ADD_REVIEWS';

//api end points
const REVIEWS_DATA = '/api/reviews';


const refinedReducer = (refinedResults, action) => {
  switch (action.type) {
    case '': {
      return;
    }
    case SEED: {
      console.log('seed');
      return [...action.data];
    }
    case PRICE_FILTER: {
      console.log('price');

      return [...action.filteredCopy];
    }
    case DIST_FILTER: {
      return [...action.filteredCopy];
    }
    case ADD_REVIEWS: {
      return [...action.filteredCopy];
    }
    default:
      throw new Error('invalid refined type');
  }
};

const initRefined = getCoreYelpData(mockData);
const useRefinedData = () => {
  const [refinedResults, dispatch] =
    useReducer(refinedReducer, initRefined);


  const setRefinedSeed = (data) => {
    // return new Promise((res, rej) => {
    console.log('3');
    dispatch({ type: 'SEED', data });
    // });
    // addReviewCount();
  };

  const applyPriceFilter = (filters, results) => {
    return new Promise((res, rej) => {
      if (filters.categories.length > 0 && results[0].price) {
        const filteredCopy = [];
        results.forEach((biz, index) => {
          if (filters.price.includes(biz.price) && biz.distance < filters.distance)
            filteredCopy.push(biz);
        });
        res(dispatch({ type: 'PRICE_FILTER', filteredCopy }));
      } else res(true);
    });
  };
  const applyAllFilters = (filters, results) => {
    applyPriceFilter(filters, results)
      .then(applyDistanceFilter(filters, results));
  };
  const applyDistanceFilter = (filters, results) => {
    // distanceFilter is integer datatype
    return new Promise((res, rej) => {
      if (filters.price.length < 1) {
        const filteredCopy = results.filter((biz, index) =>
          biz.distance < filters.distance && biz
        );
        res(dispatch({ type: 'DIST_FILTER', filteredCopy }));
      } else {
        const filteredCopy = refinedResults.filter((biz, index) =>
          biz.distance < filters.distance && biz
        );
        res(dispatch({ type: 'DIST_FILTER', filteredCopy }));
      }
    });
  };

  return {
    refinedResults,
    applyPriceFilter,
    setRefinedSeed,
    applyDistanceFilter,
    applyAllFilters
  };
};
export default useRefinedData;