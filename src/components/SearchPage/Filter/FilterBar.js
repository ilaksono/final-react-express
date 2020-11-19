import FilterItem from './FilterItem';
import 'styles/FilterBar.scss';
import { YelpContext } from 'YelpContext.js';
import { useContext } from 'react';


const FilterBar = (props) => {
  // gets categories present from all results
  
  const { results,
    filters,
    applyPriceFilter,
    applyAllFilters,
    setRefinedSeed,
    filterClick } = useContext(YelpContext);
  let val = '';
  const parsedCategoryFilters = '';

  const handleClick = ({ type, value }) => {
    // console.log('hi')
    if (!filters[type][value]) {
      console.log(filters);
      applyPriceFilter(filters);
    }
    else {
      setRefinedSeed(results);
      applyAllFilters(filters);
    }
    filterClick({ type, value });

    // if (type === 'price' || type === 'categories') {

    // }
    // if (type === 'price') {
    //   applyPriceFilter(props.filters.price);

    // }
  };

  return (
    <div class="filter-container">
      Filter:
      <div className='price-filter-container'>
        <FilterItem type='price' handleClick={() => {
          handleClick({ type: 'price', value: `$` });
        }} message='$' />
        <FilterItem type='price' handleClick={() => {
          handleClick({ type: 'price', value: `$$` });
        }} message='$$' />
        <FilterItem type='price' handleClick={() => {
          handleClick({ type: 'price', value: `$$$` });
        }} message='$$$' />
        <FilterItem type='price' handleClick={() => {
          handleClick({ type: 'price', value: `$$$$` });
        }} message='$$$$' />
      </div>
      <div className='category-filter-container'>

      </div>
    </div>
  );
};

export default FilterBar;// sort;
// comfort rating;
// yelp rating;
// most reviewed ?
// 
// 
// 
// filter;
// price
// category
// distance
// 
