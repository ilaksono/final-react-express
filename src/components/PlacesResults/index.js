import FilterBar from './FilterBar.js';
import ArticleList from './ArticleList.js';
import Map from './Map.js';
import useFilter from 'hooks/useFilter';
import './PlacesResults.scss';

const PlacesResults = props => {
  const {filters, filterClick} = useFilter();
  
  return (
    <div className='results-container'>
      <FilterBar filters={filters} filterClick={filterClick}/>
      <div className='articles-container'>
        I am articles container
      <ArticleList/>
      </div>
      <Map mapState={props.mapState}/>
    </div>
  );
}

export default PlacesResults;