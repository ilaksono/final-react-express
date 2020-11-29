import ProfilePlaceItem from './ProfilePlaceItem';

const FavSection = (props) => {

  const parsedPlaces = props.allUsers.favsDetails
    .map((place, i) => <ProfilePlaceItem
      deleteFavProfile={props.deleteFavProfile}
      {...place} whom={props.whom}
      allUsers={props.allUsers}
    />);
  return (
    <>
      {parsedPlaces}
    </>

  );
};

export default FavSection;