import 'styles/UserProfile.scss';
import { Fragment } from 'react';

const initUserPro = {
  username: '',
  img: '',

};

const Profile = (props) => {
  const formatDateYM = (timeStp) => {
    const months = ['January', 'February', 'March',
      'April', 'May', 'June', 'July', "August", 'September'
      , "October", "November", "December"];
    const date = new Date(timeStp);
    return `${months[date.getMonth()]}, ${date.getFullYear()}`;
  };

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
      <div className='help-count'>
        <label className='acc-created-label'>
          Number of Likes
        </label>
        {Number(props.whom.total) || 0}

      </div>
      <div className='account-created'>
        <label className='acc-created-label'>
          Member since
        </label>
        {formatDateYM(props.whom.created_at)}
      </div>
    </>
  );


};

export default Profile;