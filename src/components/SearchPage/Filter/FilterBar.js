import FilterItem from './FilterItem';
import 'styles/FilterBar.scss';

const FilterBar = (props) => {
  // gets categories present from all results
  const { filters,
    applyPriceFilter,
    applyAllFilters,
    filterClick,
  } = props;
  let val = '';
  const parsedCategoryFilters = '';
  const handleClick = ({ type, value }) => {
    props.filterClick({ type, value });
    if (type === 'price' || type === 'categories') {
      
    }
    if (type === 'price') {
      applyPriceFilter(props.filters.price);
    }
  };

  return (
    <div class="filter-container">
      Filter:
      <div className='price-filter-container'>
        <FilterItem type='price' applyPriceFilter={props.applyPriceFilter} filterClick={() => {
          handleClick({ type: 'price', value: `$` });
        }} message='$' />
        <FilterItem type='price' filterClick={() => {
          handleClick({ type: 'price', value: `$$` });
        }} message='$$' />
        <FilterItem type='price' filterClick={() => {
          handleClick({ type: 'price', value: `$$$` });
        }} message='$$$' />
        <FilterItem type='price' filterClick={() => {
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
