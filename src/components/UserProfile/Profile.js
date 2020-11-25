import 'styles/UserProfile.scss';
import { Fragment } from 'react';

const initUserPro = {
  username: '',
  img: '',

};

const Profile = (props) => {
  

  return (
    <>
      <div className='profile-header'>
        {props.whom.username && props.whom.username}
      </div>
      {
        props.whom.profile_pic &&
        <div className='profile-picture-container'>
          <img className='profile-picture' src={props.whom.profile_pic} alt='no img found' />
        </div>
      }
      <div className='city-container'>
        {props.whom.city}
        <img src="https://www.countryflags.io/ca/shiny/32.png" alt='flag not found' />
      </div>
    </>
  );


};

export default Profile;