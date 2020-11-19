import { useReducer } from 'react';
import getCoreYelpData, { mockData } from 'helpers/data_filter.js';

const SEED = 'SEED';
const SORT = 'SORT'; // can also be sort by x
const PRICE_FILTER = 'PRICE_FILTER';
const DIST_FILTER = 'DIST_FILTER';

const refinedReducer = (refinedResults, action) => {
  switch (action.type) {
    case '': {
      return;
    }
    case SEED: {
      return [...action.data];
    }
    case PRICE_FILTER: {
      return [...action.filteredCopy];
    }
    case DIST_FILTER: {
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
    console.log('1')
    dispatch({ type: 'SEED', data });
  };

  const applyPriceFilter = (filters) => {
    console.log('2');
    const filteredCopy = [];
    refinedResults.forEach((biz, index) => {
      if (filters.price[biz.price])
        filteredCopy.push(biz);
    });
    dispatch({ type: 'PRICE_FILTER', filteredCopy });
  };
  const applyAllFilters = (filters) => {
    if (filters.price.length)
      applyPriceFilter(filters);
    // if (filters.distance)
      // applyDistanceFilter(filters.distance);
  };
  const applyDistanceFilter = (distanceFilter) => {
    // distanceFilter is integer datatype
    const filteredCopy = [];
    refinedResults.forEach((biz, index) => {
      if (biz.distance < distanceFilter)
        filteredCopy.push(biz);
    });
    dispatch({ type: 'DIST_FILTER', filteredCopy });
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