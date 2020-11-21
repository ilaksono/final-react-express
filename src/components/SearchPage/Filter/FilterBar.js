import FilterItem from './FilterItem';
import 'styles/FilterBar.scss';
import { YelpContext } from 'YelpContext.js';
import { useContext, useEffect, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import SquishCategory from './SquishCategory.js';

const FilterBar = (props) => {
  // context destructure
  const { results,
    applyPriceFilter,
    applyAllFilters,
    setRefinedSeed,
    refinedResults,
    filters, filterClick,
    applyDistanceFilter,
    distanceFilterClick,
    addResults,
    populateCenter,
    getCenterPan,
    panTo,
    toggleFilterShow,
    expandCategories
  } = useContext(YelpContext);

  let parsedCategoryFilters = [];
  if (filters.categories.length) {
    parsedCategoryFilters = filters.categories.map((cat, index) => {
      return (
        <FilterItem filters={filters}
          message={cat}
          type='categories'
          handleClick={(event) =>
            handleClick({ type: 'categories', value: event.target.getAttribute('name') })}
          key={index} />
      );
    });
  }

  useEffect(() => {
    applyPriceFilter(filters, results);
    // eslint-disable-next-line
  }, [filters]);

  useEffect(() => {
    addResults(refinedResults);
    // populateCenter(refinedResults);
    getCenterPan(refinedResults)
      .then(res => {
        panTo(res);
      })
      .catch(er => console.log(er));
    // eslint-disable-next-line
  }, [refinedResults]);

  const handleClick = ({ type, value }) => {
    if (type === 'price' || type === 'categories')
      filterClick({ type, value });
    if (type === 'distance')
      distanceFilterClick(value);
    // if (type === 'category')
    //categoryFilterClick(value);  
  };

  return (
    <div className="filter-container">
      <Button
        variant="outlined"
        color="secondary"
        onClick={toggleFilterShow}>
        Hide Filters
      </Button>
      {(filters.price.length > 0 && filters.mode) && (<div className='price-filter-container'>
        <FilterItem type='price' handleClick={() =>
          handleClick({ type: 'price', value: `$` })}
          message='$' filters={filters} />
        <FilterItem type='price' handleClick={() =>
          handleClick({ type: 'price', value: `$$` })
        } message='$$' filters={filters} />
        <FilterItem type='price' handleClick={() =>
          handleClick({ type: 'price', value: `$$$` })
        } message='$$$' filters={filters} />
        <FilterItem type='price' handleClick={() =>
          handleClick({ type: 'price', value: `$$$$` })
        } message='$$$$' filters={filters} />
      </div>)}
      <div className='category-filter-container'>
        {
          !filters.expandCats ?
            <>
              <SquishCategory filters={filters}
                expandCategories={expandCategories} />
              {filters.categories.length > 3 &&
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={expandCategories}>
                  Expand Categories
              </Button>}
            </>
            : filters.categories.length > 3 ?
              <>
                {parsedCategoryFilters}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={expandCategories}>
                  Less Categories
              </Button>
              </>
              : <>
                <SquishCategory filters={filters}
                  expandCategories={expandCategories} />

              </>
        }

        {/* {parsedCategoryFilters.length > 0 && filters.expandCats && parsedCategoryFilters}
        {!filters.expand && filters.categories.length > 4 
        && 
        <>
        <SquishCategory filters={filters} 
        expandCategories={expandCategories}/>
        <Button
          variant="outlined"
          color="primary"
          onClick={expandCategories}>
          Expand Categories
      </Button>
      </>} */}
      </div>
      <div className='distance-filter-container'>
        <FilterItem type='distance' handleClick={() =>
          handleClick({ type: 'distance', value: 50000 })}
          filters={filters} message='Far Away' value={50000} />
        <FilterItem type='distance' handleClick={() =>
          handleClick({ type: 'distance', value: 8000 })}
          filters={filters} message='8 km' value={8000} />
        <FilterItem type='distance' handleClick={() =>
          handleClick({ type: 'distance', value: 6000 })}
          filters={filters} message='6 km' value={6000} />
        <FilterItem type='distance' handleClick={() =>
          handleClick({ type: 'distance', value: 4000 })}
          filters={filters} message='4 km' value={4000} />
        <FilterItem type='distance' handleClick={() =>
          handleClick({ type: 'distance', value: 2000 })}
          filters={filters} message='< 2 km' value={2000} />
      </div>
    </div>
  );
};

export default FilterBar;// sort;
// comfort rating;
// yelp rating;
// most reviewed ?
// 
// filter;
// price
// category
// distance
// isopen
