import { Fragment, useContext } from 'react';
import { YelpContext } from 'YelpContext';
import { Link } from 'react-router-dom';

const FavSection = (props) => {
  const { getIndividualBusinessData } = useContext(YelpContext);
  const parsedFavs = props.favs.map((fav, index) => {
    return (
      <Link
        key={index}
        to={`/search/${fav.venue_id}`}
      >
        <div className='fav-item' onClick={() => getIndividualBusinessData(fav.venue_id)}>
          {fav.venue_name}
        </div>
      </Link>
    );
  });
  return (
    <>
      {
        parsedFavs
      }
    </>

  );
};

export default FavSection;