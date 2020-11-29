import { useContext, useState } from 'react';
import { YelpContext } from 'YelpContext';
import { Link } from 'react-router-dom';
import ProfilePlaceItem from './ProfilePlaceItem';
// import SimpleGrow from 'components/BusinessPage/FavouriteAnimation';

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
  // const initAnim = {
  //   favGrow: false
  // };

  // const [busAnim, setBusAnim] = useState(initAnim);

  const parsedPlaces = props.allUsers.favsDetails
    .map((place, i) => <ProfilePlaceItem 
    // busAnim={busAnim}
    deleteFavProfile={props.deleteFavProfile} 
    {...place} whom={props.whom} 
    allUsers={props.allUsers}
    // setBusAnim={setBusAnim}
    />)
  return (
    <>
      {/* {
        parsedFavs
      }
       */}
       {parsedPlaces}
      {/* <SimpleGrow busAnim={busAnim} setBusAnim={setBusAnim}
        color='grey'
      /> */}
    </>

  );
};

export default FavSection;