import 'styles/UserProfile.scss';
import { useEffect, useState } from 'react';
import ReviewList from 'components/BusinessPage/ReviewList';
import Profile from './Profile';
import { useParams } from 'react-router-dom';
import useProfileData from 'hooks/useProfileData';
import { CircularProgress } from '@material-ui/core';
import FavSection from './FavSection';

const initFocus = {
  like: false,
  rev: false
};
const UserProfile = (props) => {

  const [focus, setFocus] = useState(initFocus);

  const { id } = useParams();
  const { allUsers,
    getTimeRating,
    profileHelpCount,
    getUsersAPI,
    setAllUsers
  } = useProfileData();

  useEffect(() => {
    getTimeRating(id);
    // eslint-disable-next-line
  }, [id]);
  useEffect(() => {
    getUsersAPI()
      .then((res) => {
        setAllUsers({ ...allUsers, all: res.data.data });
        props.setNewRegister(false);
      });
    // eslint-disable-next-line
  }, [props.newRegister]);

  // eslint-disable-next-line
  const whom = allUsers.all.find(user => user.id == id) || null;
  return (
    <div className='user-profile-layout'>
      {
        !whom ?
          <div className='loading-circle' style={{ marginLeft: '45%' }}>
            <CircularProgress size={140} color="secondary" />
          </div>
          :
          <>
            <div className='profile-container'>
              <Profile
                whom={whom || {}}
                length={allUsers.reviews.length}
                setFocus={setFocus} />
            </div>
            {allUsers.reviews &&
              <div className={`profile-reviews${focus.rev ? '-hover' : ''}`}>

                <div className='review-big-container'>
                  <div classname='reviews'>
                    <ReviewList
                      reviews={allUsers.reviews}
                      isProfile={true}
                      profileHelpCount={profileHelpCount}
                    />
                  </div>
                </div>
              </div>
            }
            <div className='user-chart-container'>
              {
                allUsers.favs.length ?
                  <>
                    <div className='chart-title'>Favourite Places</div>

                    <FavSection favs={allUsers.favs} />
                  </>
                  :
                  <div className='no-places-info'>
                    {`${whom.username || 'This User'} has no favourite places.`}
                  </div>
              }
            </div>
          </>
      }
    </div>
  );
};
export default UserProfile;