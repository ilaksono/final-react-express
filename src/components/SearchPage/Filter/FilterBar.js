import FilterItem from './FilterItem';
import 'styles/FilterBar.scss';

const FilterBar = (props) => {
  // gets categories present from all results
  
  let val = '';
  const parsedPriceFilters = [];
  for (let i = 0; i < 4; i++) {
    val = val.concat('$');
    // eslint-disable-next-line
    parsedPriceFilters.push(<FilterItem type='price' key={i} filterClick={() => {
      props.filterClick({ type: 'price', value: `${val}` });
    }} message={val} />);
  }
  const parsedCategoryFilters = '';

  return (
    <div class="filter-container">
      Filter:
      <div className='price-filter-container'>
        <FilterItem type='price' filterClick={() => {
          props.filterClick({ type: 'price', value: `$` });
        }} message='$' />
        <FilterItem type='price' filterClick={() => {
          props.filterClick({ type: 'price', value: `$$` });
        }} message='$$' />
        <FilterItem type='price' filterClick={() => {
          props.filterClick({ type: 'price', value: `$$$` });
        }} message='$$$' />
        <FilterItem type='price' filterClick={() => {
          props.filterClick({ type: 'price', value: `$$$$` });
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
