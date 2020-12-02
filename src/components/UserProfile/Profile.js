import { useState } from 'react';
import PhotoModal from 'components/BusinessPage/PhotoModal.js';


const initBig = {
  open: false,
  url: ''
};
const Profile = (props) => {

  const [bigPhoto, setBigPhoto] = useState(initBig);

  const hideBigPhoto = () => {
    setBigPhoto({ ...bigPhoto, open: false });
  };

  const formatDateYM = (timeStp) => {
    const months = ['January', 'February', 'March',
      'April', 'May', 'June', 'July', "August", 'September'
      , "October", "November", "December"];
    const date = new Date(timeStp);
    return `${months[date.getMonth()]}, ${date.getFullYear()}`;
  };

  const reviewTableHover = () => {
    props.setFocus(prev => ({
      ...prev,
      rev: true
    }));
  };
  const notReviewTableHover = () => {
    props.setFocus(prev => ({
      ...prev,
      rev: false
    }));
  };

  return (
    <>
      <div className='profile-header'>
        {props.whom.username && props.whom.username}
      </div>
      {
        props.whom.profile_pic &&
        <div className='profile-picture-container'>
          <img className='profile-picture'
            src={props.whom.profile_pic}
            alt='no img found'
            style={{
              cursor: 'pointer'
            }}
            onClick={() => setBigPhoto({ ...bigPhoto, open: true })}
          />
        </div>
      }
      {
        <PhotoModal
          url={props.whom.profile_pic}
          bigPhoto={bigPhoto}
          hideBigPhoto={hideBigPhoto}
        />

      }
      <div className='city-container'>
        {props.whom.city}
        <img src="https://www.countryflags.io/ca/shiny/32.png" alt='flag not found' />
      </div>
      <div className='help-count'>
        <table className='profile-info-table'>
          <tbody>

            <tr className='profile-thead'>
              <td>
                <i className="far fa-thumbs-up review-table-icon"></i>
              Helpful
            </td>
              <td
                
              >
                <i className="fas fa-feather-alt review-table-icon"></i>
              Reviews
            </td>
            </tr>
            <tr>
              <td>
                {Number(props.whom.total) || 0}
              </td>

              <td className='review-table-doc' 
                > {props.length || 0}
              </td>
            </tr>
          </tbody>
        </table>
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