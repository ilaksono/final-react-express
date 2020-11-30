import { useEffect, useState, useContext } from 'react';
import ReviewList from 'components/BusinessPage/ReviewList';
import Profile from './Profile';
import { useParams, useHistory } from 'react-router-dom';
import useProfileData from 'hooks/useProfileData';
import { CircularProgress } from '@material-ui/core';
import FavSection from './FavSection';
import { Button } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { YelpContext } from 'YelpContext';
const initFocus = {
  like: false,
  rev: false
};
const UserProfile = (props) => {

  const [focus, setFocus] = useState(initFocus);
  const [selected, setSelected] = useState("reviews");
  const history = useHistory();
  const { id } = useParams();
  const { allUsers,
    getTimeRating,
    profileHelpCount,
    getUsersAPI,
    setAllUsers,
    profileDeleteReview,
    deleteFavProfile,
    resetFiltersHandle
  } = useProfileData();
  const { newReview, setNewReview, loadToxic } = useContext(YelpContext);
  useEffect(() => {
    getTimeRating(id);
    // eslint-disable-next-line
  }, [id, loadToxic]);
  useEffect(() => {
    getUsersAPI()
      .then((res) => {
        setAllUsers({ ...allUsers, all: res.data.data });
        props.setNewRegister(false);
      });
    // eslint-disable-next-line
  }, [props.newRegister]);
  useEffect(() => {
    if (id)
      getTimeRating(id)
        .then(() => setNewReview(true));
    // eslint-disable-next-line
  }, [newReview, loadToxic]);

  const whom = allUsers.all // eslint-disable-next-line
  .find(user => user.id == id) || null;
  
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
              <div className='back-arrow-fixed'>
                <Button variant="contained"
                  onClick={() => {
                    resetFiltersHandle();
                    history.goBack()
                    }}>
                  <KeyboardBackspaceIcon />
                </Button>
              </div>
              <Profile
                whom={whom || {}}
                length={allUsers.reviews.length}
                setFocus={setFocus} />
            </div>
            <div className="reviews-fav-container">
              <div className="reviews-fav-title-container">
                <div className={ selected === "reviews" ? "reviews-fav-title title-selected" : "reviews-fav-title"} onClick={() => setSelected("reviews")}>
                  REVIEWS
                </div>
                <div className={ selected === "favourites" ? "reviews-fav-title title-selected" : "reviews-fav-title"} onClick={() => setSelected("favourites")}>
                  FAVOURITES
                </div>
              </div>
              { selected === "reviews" && (
                <div className={`profile-reviews${focus.rev ? '-hover' : ''}`}>
                {
                  allUsers.reviews.length > 0 ?
                    <>
                      <div className='review-big-container'>
                          <ReviewList
                            reviews={allUsers.reviews}
                            isProfile={true}
                            profileHelpCount={profileHelpCount}
                            profileDeleteReview={profileDeleteReview}
                          />
                      </div>
                    </>
                  :
                  <div className='no-places-info'>
                    {`${whom.username || 'This User'} has no reviews`}
                  </div>
                }
                </div>
              )}
              { selected === "favourites" && (
                <div className='user-chart-container'>
                {
                  allUsers.favsDetails.length ?
                    <>
                      <FavSection deleteFavProfile={deleteFavProfile} 
                      whom={whom} allUsers={allUsers}/>
                    </>
                    :
                    <div className='no-places-info'>
                      {`${whom.username || 'This User'} has no favourite places`}
                    </div>
                }
              </div>
              )}
            </div>
          </>
      }
    </div>
  );
};
export default UserProfile;