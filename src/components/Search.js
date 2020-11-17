
import { Link } from 'react-router-dom';

const Search = props => {
  
  
  return (
    <div>
      <input type='text'/>
      <div className='results-container'>
      </div>
      <Link to={'/maps'}>
        <button>Go to Maps</button>
      </Link>
    </div>
  );

};



export default Search;