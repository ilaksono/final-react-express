import Button from 'components/Button';
import { Link} from 'react-router-dom';


const Home = () => {

  return (
    <div>
      <Link to='/search'>
       <button>Search</button>
      </Link>
    </div>
  );
};

export default Home;