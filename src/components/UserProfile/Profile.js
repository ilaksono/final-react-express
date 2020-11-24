import YelpContext from 'YelpContext';
import { useContext, useState } from 'react';

const initUserPro = {
  username: '',
  img: '',

};

const Profile = (props) => {

  // const { }

  return (
    <div> this is profile
      {props.whom.username && props.whom.username}
      {props.whom.image_url && props.whom.image_url}

    </div>
  );


};

export default Profile;