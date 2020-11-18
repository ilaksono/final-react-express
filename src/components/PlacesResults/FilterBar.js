import FilterItem from './FilterItem';

const FilterBar = (props) => {

  const getCategories = (results) => {
    const cats = [];

    for (const result of results) {
      for (const cat of Object.values(result.categories)) {
        if (!cats.includes(cat)) cats.push(cat);
      }
    }
    return cats;
  };
  let val = '';
  const parsedPriceFilters = [];
  for (let i = 0; i < 4; i++) {
    val = val.concat('$');
// eslint-disable-next-line
    parsedPriceFilters.push(<FilterItem type='price' key={i} filterClick={() => {
      props.filterClick({ type: 'price', value: `${val}` })}} message={val}/>);
  }

  return (
    <div>
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
    </div>
  );
};

export default FilterBar;// sort;
// comfort rating;
// yelp rating;
// most reviewed ?
// distance
// 
// 
// filter;
// price
// category
// 
