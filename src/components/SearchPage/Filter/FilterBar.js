import FilterItem from './FilterItem';
import 'styles/FilterBar.scss';
import { YelpContext } from 'YelpContext.js';
import { useContext, useEffect } from 'react';


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
    addResults
  } = useContext(YelpContext);

  let parsedCategoryFilters = [];
  if (filters.categories.length) {
    parsedCategoryFilters = filters.categories.map((cat, index) => {
      return (
        <FilterItem filters={filters}
          message={cat}
          type='category'
          handleClick={(event) => 
            console.log(event.target.getAttribute('name'))}
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
    // eslint-disable-next-line
  }, [refinedResults]);

  const handleClick = ({ type, value }) => {
    if (type === 'price')
      filterClick({ type, value });
    if (type === 'distance')
      distanceFilterClick(value);
    // if (type === 'category')
      //categoryFilterClick(value);  
  };

  return (
    <div className="filter-container">
      Filter:
      { filters.mode && (<div className='price-filter-container'>
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
        {parsedCategoryFilters.length > 0 && parsedCategoryFilters}
      </div>
      <div className='distance-filter-container'>
        <FilterItem type='distance' handleClick={() =>
          handleClick({ type: 'distance', value: 50000 })} filters={filters} message='Large Distance' value={50000} />
        <FilterItem type='distance' handleClick={() =>
          handleClick({ type: 'distance', value: 8000 })} filters={filters} message='8 km' value={8000} />
        <FilterItem type='distance' handleClick={() =>
          handleClick({ type: 'distance', value: 6000 })} filters={filters} message='6 km' value={6000} />
        <FilterItem type='distance' handleClick={() =>
          handleClick({ type: 'distance', value: 4000 })} filters={filters} message='4 km' value={4000} />
        <FilterItem type='distance' handleClick={() =>
          handleClick({ type: 'distance', value: 2000 })} filters={filters} message='< 2 km' value={2000} />
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
