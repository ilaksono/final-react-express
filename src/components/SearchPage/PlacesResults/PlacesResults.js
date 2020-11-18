import ArticleList from './ArticleList.js';
import './PlacesResults.scss';

const PlacesResults = props => {
  
  return (
    <div className='results-container'>
      <div className='articles-container'>
        I am articles container
      <ArticleList/>
      </div>
    </div>
  );
}

export default PlacesResults;