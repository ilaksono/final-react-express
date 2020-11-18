import FilterBar from './FilterBar.js';
import ArticleList from './ArticleList.js';
import Map from './Map.js';
import useFilter from 'hooks/useFilter';

const PlacesResults = props => {
  const {filters, setFilters} = useFilter();

  return (
    <div>
      <FilterBar filters={filters} setFilters={setFilters}/>
      <ArticleList/>
      <Map mapState={props.mapState}/>
    </div>
  );
}

export default PlacesResults;