import React, { useContext, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { YelpContext } from 'YelpContext';
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import AlertDialog from 'components/AlertDialog';

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
})(Rating);

/* 
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
})); */

const ProfilePlaceItem = (props) => {

  const { getIndividualBusinessData, appState,
    handleFav } = useContext(YelpContext);
  const { id } = useParams();
  const history = useHistory();
  const [hover, setHover] = useState(false);

  const moveToNextPage = () => {
    getIndividualBusinessData(props.id)
      .then(() => {
        history.push(`/search/${props.id}`);
      });
  };
  const handleFavClick = async () => {
    setOpenAlert(false);
    // props.setBusAnim(prev=> ({...prev, favGrow: true}));
    try {
      const response = await axios
        .delete('/api/favs', {
          data:
          {
            biz_id: props.id,
            user_id: id
          }
        });
      props.deleteFavProfile(props.id);
      handleFav(props.id);


    } catch (er) {
      console.log(er);
    }
  };
  const promptConfirm = () => {
    setOpenAlert(true);
  };
  const promptOnClose = () => {
    setOpenAlert(false);
  };


  const [openAlert, setOpenAlert] = useState(false);
  return (
    <>
      {props.name && (
        <div className='profile-result-container'>
          <div className="pro-img-general-info-container">
            <div
              style={{
                backgroundImage: `url(${props.photos[0]})`,
                width: '124px',
                height: '124px',
                backgroundSize: 'cover',
                marginLeft: '8px',
                borderRadius: '20px',
                filter: 'grayscale(0%)',
                ...(hover && { filter: 'grayscale(0%)', borderRadius: '10px', cursor: 'pointer' })
              }}
              onClick={moveToNextPage}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              src={props.photos[0]}
            >
            </div>
            <div className='profile-general-info'>
              <div className="title-favourite-container">
                <h3 className="profile-venue-name" onClick={moveToNextPage}>{props.name}</h3>
                <AlertDialog open={openAlert}
                  onClose={promptOnClose}
                  delete={() => handleFavClick(props.id)}
                  message={`Unfavourite ${props.name}?`}
                />

                {id == appState.user_id &&
                  <FavoriteIcon
                    style={{
                      color: 'red',
                      cursor: 'pointer',
                    }}
                    onClick={promptConfirm}
                  />
                }
              </div>
              <div className='profile-location'>
                {props.phone}<br />
                {props.location.address1}, &nbsp;
                {props.location.city}
              </div>
              {
                props.hours &&
                <div className={!props.hours[0].is_open_now ? "is-closed" : "is-open"}>
                  {!props.hours[0].is_open_now ? "Closed Now" : "Open Now"}
                </div>

              }
              {props.profile_review ?
                <>
                  <div className="rating-outer-container">


                    <div className="rating-title">
                      {props.whom.username}:
                    </div>
                    <Box component="fieldset" mb={0} pb={0} pt={0} borderColor="transparent">
                      {isNaN(props.profile_review.overall_rating) ? "N/A"
                        : <StyledRating
                          name="customized-color"
                          size="small"
                          value={props.profile_review.overall_rating}
                          precision={0.5}
                          icon={<FavoriteIcon fontSize="inherit" />}
                          readOnly
                        />}
                    </Box>
                  </div>
                  <div>
                    "{props.profile_review.description}"
                </div>
                </>
                :
                id === appState.user_id ?
                  <Link to={`/search/${props.id}`}>
                    <div className='prof-write-review' onClick={() => getIndividualBusinessData(props.id)}>
                      Write a Review
               </div>

                  </Link>
                  : ''
              }

            </div>
          </div>
        </div>
      )}



    </>
  );
};

export default ProfilePlaceItem;

{/* <>
          <div className='result-container'
            onClick={moveToNextPage}>
            <div className='pro-general-info'>
              <div className='pro-img-container'>
                <img src={props.photos[0]} alt="Logo" className='pro-venue-image' />
              </div>
              <h3 className="pro-venue_name">{props.name}</h3>
            </div>

            <div className="pro-rating-outer-container">
              <div className="rating-title">
                Yelp Rating:
                </div>
              <Box component="fieldset" mb={0} pb={0} pt={0} borderColor="transparent">
                <Rating name="read-only" precision={0.5} value={props.rating} readOnly size="small" />
              </Box>
              <div className="covid_review_count">
                ({props.review_count})
                </div>
            </div>
            {props.profile_review ?
              <>
                <div className="pro-rating-outer-container">


                  <div className="pro-rating-title">
                    {props.whom.username}:
                    </div>
                  <Box component="fieldset" mb={0} pb={0} pt={0} borderColor="transparent">
                    {isNaN(props.profile_review.overall_rating) ? "N/A"
                      : <StyledRating
                        name="customized-color"
                        size="small"
                        value={props.profile_review.overall_rating}
                        precision={0.5}
                        icon={<FavoriteIcon fontSize="inherit" />}
                        readOnly
                      />}
                  </Box>
                </div>
                <div>
                  "{props.profile_review.description}"
                </div>
              </>
              :
              id === appState.user_id ?
                <Link to={`/search/${props.id}`}>
                  <div className='prof-write-review' onClick={() => getIndividualBusinessData(props.id)}>
                    Write a Review
               </div>

                </Link>
                : ''
            }
            <div className='prof-place-footer'>
              <div className='pro-location'>
                {props.phone}<br />
                {props.location.address1 && <>{props.location.address1} <br /></>}
                {props.location.city}
              </div>
              
            </div>
          </div>
        </> */}