import PlaceList from './PlaceList';
import 'styles/Results.scss';

const Results = props => {

  return (
    <div className='results-container'>
      <div className='articles-container'>
        <PlaceList refinedResults={props.refinedResults}/>
      </div>
    </div>
  );
}

export default Results;