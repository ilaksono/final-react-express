import { useReducer } from 'react';

// reducer constants
const SEED = 'SEED';
const SORT = 'SORT'; // can also be sort by x
const PRICE_FILTER = 'PRICE_FILTER';
const DIST_FILTER = 'DIST_FILTER';
const ADD_REVIEWS = 'ADD_REVIEWS';
const RESET = 'RESET';
//api end points
const REVIEWS_DATA = '/api/reviews';

const initRefined = [];

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
    case ADD_REVIEWS: {
      return [...action.filteredCopy];
    }
    case SORT: {
      return [...action.filteredCopy];
    }
    case RESET: {
      return initRefined;
    }
    default:
      throw new Error('invalid refined type');
  }
};

const useRefinedData = () => {
  const [refinedResults, dispatch] =
    useReducer(refinedReducer, initRefined);

  const setRefinedSeed = (data) => {
    dispatch({ type: 'SEED', data });
  };

  const applyPriceFilter = (filters, results) => {
    return new Promise((res, rej) => {
      if (filters.categories.length > 0
        && results.some((res) => res.price)) {
        const filteredCopy = [];
        results.forEach((biz) => {

          if (filters.allCats && filters.allPrice
            && biz.distance < filters.distance)
            filteredCopy.push(biz);
          else if (filters.allPrice
            && biz.categories.some(cat => filters.catsSelected.includes(cat))
            && biz.distance < filters.distance)
            filteredCopy.push(biz);
          else if (filters.catsSelected.length < 1) {
            if (filters.price.includes(biz.price)
              && biz.distance < filters.distance)
              filteredCopy.push(biz);
            else if (biz.price === undefined
              && biz.distance < filters.distance)
              filteredCopy.push(biz);
          }
          else if (filters.price.includes(biz.price)
            && biz.distance < filters.distance
            && filters.catsSelected.some(cat =>
              biz.categories.includes(cat)))
            filteredCopy.push(biz);
          else if (biz.price === undefined &&
            filters.price.length > 3 &&
            filters.catsSelected.some(cat =>
              biz.categories.includes(cat)) &&
            biz.distance < filters.distance)
            filteredCopy.push(biz);
        });
        res(dispatch({ type: 'PRICE_FILTER', filteredCopy }));
      } else {
        const filteredCopy = [];
        results.forEach((biz) => {
          if (filters.catsSelected.length < 1) {
            if (biz.distance < filters.distance)
              filteredCopy.push(biz);
          } else if (biz.distance < filters.distance
            && filters.catsSelected.some(cat =>
              biz.categories.includes(cat)))
            filteredCopy.push(biz);
        });
        res(dispatch({ type: 'PRICE_FILTER', filteredCopy }));
      }
    });
  };
  const applyDistanceFilter = (filters, results) => {
    let filteredCopy = [];
    // distanceFilter is integer datatype
    return new Promise((res, rej) => {
      if (filters.allPrice && filters.allCats) {
        filteredCopy = results.filter(biz =>
          biz.distance < filters.distance
        );
      }
      else if (filters.price.length < 1) {
        filteredCopy = results.filter((biz, index) =>
          biz.distance < filters.distance && biz
        );
      } else {
        filteredCopy = refinedResults.filter((biz, index) =>
          biz.distance < filters.distance && biz
        );
        res(dispatch({ type: 'DIST_FILTER', filteredCopy }));
      }
    });
  };
  const resetRefinedResults = () => {
    dispatch({ type: RESET });
  };

  return {
    refinedResults,
    applyPriceFilter,
    setRefinedSeed,
    applyDistanceFilter,
    resetRefinedResults
  };
};
export default useRefinedData;