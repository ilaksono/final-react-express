import FilterItem from './FilterItem';

const FilterBar = (props) => {
  const getCategories = (results) => {
    const cats = []

    for(const result of results) {
      for(const cat of result.categories) {
        
      }
    }
    
    return 
  }

  return (
    <div>
      <div className='price-filter-container'></div>
      <FilterItem setFilters={() => props.setFilters({type:'$'})}>$</FilterItem>
    </div>
  )
}

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
