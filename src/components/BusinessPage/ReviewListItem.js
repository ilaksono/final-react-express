import { useContext, useState, Fragment, useEffect } from 'react';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { YelpContext } from 'YelpContext.js';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NewReview from '../Review/NewReview';
import { Link } from 'react-router-dom';
import AlertDialog from '../AlertDialog';
import { HashLink } from 'react-router-hash-link';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({

  liked: {
    fontWeight: 'bold',
    color: '#FF717C',
    '&:hover': {
      color: 'rgba(0, 0, 0, 0.54)',
    },
  },
  notliked: {
    color: 'rgba(0, 0, 0, 0.54)',
    '&:hover': {
      color: '#FF717C',
    },

  },
}));

export default function ReviewListItem(props) {

  const { businessDetails, setBusinessDetails, appState, getIndividualBusinessData, handleLikes, wipeBusinessPage } = useContext(YelpContext);
  const [openAlert, setOpenAlert] = useState(false);

  const [open, setOpen] = useState(false);

  const handleAlert = () => {
    setOpenAlert(true);
  };

  const closeAlert = () => {
    setOpenAlert(false);
  };

  const handleEdit = () => {
    setOpen(true);
  };
  useEffect(() => {
    return () => setRevAnim(initAnim);
  }, []);


  const updateHelpfulCount = (id, name) => {

    if (props.isProfile) {
      return axios.post('/api/reviews/helpful', { id, username: name })
        .then((response) => {
          props.profileHelpCount(id, response.data);
          return;
        });
    }

    else if (props.isHome) {
      return axios.post('/api/reviews/helpful', { id, username: name })
        .then((response) => {
          props.profileHelpCount(id, response.data);
          return;
        });
    }

    else {

      return axios.post('/api/reviews/helpful', { id, username: name })
        .then((response) => {
          if (!handleLikes(props.id)) {
            if (response.data === "add") {
              const updatedBusinessDetails = { ...businessDetails };
              updatedBusinessDetails.reviews.map
                (review => review.id === id ?
                  review.helpful_count += 1
                  : "");
              setBusinessDetails(updatedBusinessDetails);
            }
          }
          if (handleLikes(props.id)) {
            if (response.data === "delete") {
              const updatedBusinessDetails = { ...businessDetails };
              updatedBusinessDetails.reviews.map
                (review => review.id === id && review.helpful_count > 0 ?
                  review.helpful_count -= 1
                  : "");
              setBusinessDetails(updatedBusinessDetails);
            };
          }
        });
    }
  };



  const deleteReview = () => {

    if (props.isHome) {
      return axios.post("/api/reviews/delete", { id: props.id, user_id: appState.user_id })
        .then(() => {
          props.profileDeleteReview(props.id);
          closeAlert();
        })
        .catch(err => { console.log(err); });
    };

    if (props.isProfile) {
      return axios.post("/api/reviews/delete", { id: props.id, user_id: appState.user_id })
        .then(() => {
          props.profileDeleteReview(props.id);
          closeAlert();
        })
        .catch(err => { console.log(err); });
    };

    return axios.post("/api/reviews/delete", { id: props.id, user_id: appState.user_id })
      .then(() => {
        const updatedBusinessDetails = { ...businessDetails };
        updatedBusinessDetails.reviews.map(review => {
          if (review.id === props.id) {
            const indexOfReview = updatedBusinessDetails.reviews.indexOf(review);
            updatedBusinessDetails.reviews.splice(indexOfReview, 1);
            setBusinessDetails(updatedBusinessDetails);
            closeAlert();
          }
        });
      })
      .catch(err => { console.log(err); });
  };

  const convertTime = (date) => {
    const time = new Date(date).getTime();
    let unit = "second";
    let diff = (new Date().getTime() - time) / 1000;

    if (diff >= 60) {
      // convert to minutes
      diff /= 60;
      unit = "minute";
      if (diff >= 60) {
        // '' hours
        diff /= 60;
        unit = "hour";
        if (diff >= 24) {
          // '' days
          diff /= 24;
          unit = "day";
          if (diff >= 30) {
            // '' months
            diff /= 30;
            unit = "month";
            if (diff >= 12) {
              // '' years
              diff /= 12;
              unit = "year";
            }
          }
        }
      }
    }
    diff = parseInt(diff);
    if (diff !== 1) unit += "s";
    return `${diff} ${unit} ago`;
  };


  const formatDateString = date => {
    const newDate = new Date(date);
    const dateShortened = newDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    return dateShortened;
  };
  const initAnim = {
    smallWob: false,
    likeBounce: false,
    fadeOut: false
  };
  const [revAnim, setRevAnim] = useState(initAnim);


  return (
    <div
      className={`review-container`}
    // onMouseOver={() => setRevAnim({ ...revAnim, smallWob: true })}
    // onAnimationEnd={() => setRevAnim({ ...revAnim, smallWob: false })}
    >
      <AlertDialog open={openAlert} onClose={closeAlert} delete={deleteReview} message={"Are you sure you want to delete"} />
      {(props.isHome || props.isProfile) && (
        <div className='review-title-container'>
          <Link to={`/search/${props.venue_id}`} className="review-title" onClick={() => {
            wipeBusinessPage();
            getIndividualBusinessData(props.venue_id);
          }}>
            {props.venue_name}
          </Link>
        </div>
      )}
      <div className='header-container'>
        <div className='user'>
          {
            // isProfile && isHome are both true for home page
            (props.picture && (props.isProfile && props.isHome) || (!props.isProfile && !props.isHome)) &&
            <Link to={`/users/${props.user_id}`} >
              <img className='profile-img' src={props.picture} alt='no img found' />
            </Link>
          }
          <div className="username-date">
            {!(props.isProfile || props.isHome) && (
              <Link to={`/users/${props.user_id}`}>
                <span className='review-header-link'>{props.username}</span>
              </Link>
            )}

            {
              props.isHome &&
              <Link to={`/users/${props.user_id}`} >

                <span className='review-header-link'>{props.username}</span>
              </Link>
            }
            {
              !props.isHome &&
              <span className="review-date">{formatDateString(props.date)}</span>
            }
            <div className='time-ago'>
              {convertTime(props.date)}
            </div>
          </div>
        </div>
        <table className='review-table'>
          <tbody>
            <tr className="table-row">
              <td className="left">
                Cleanliness
              </td>
              <td className="right">
                {props.cleanliness} <FavoriteIcon style={{ fontSize: '16px', color: '#FF717C' }} />
              </td>
              <td className="left">
                Distancing
              </td>
              <td className="right">
                {props.social_distancing} <FavoriteIcon style={{ fontSize: '16px', color: '#FF717C' }} />
              </td>
            </tr>
            <tr className="table-row">
              <td className="left">
                Transaction
              </td>
              <td className="right">
                {props.transaction_process} <FavoriteIcon style={{ fontSize: '16px', color: '#FF717C' }} />
              </td>
              <td className="left">
                Overall
              </td>
              <td className="right">
                {props.overall_rating} <FavoriteIcon style={{ fontSize: '16px', color: '#FF717C' }} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='review-content'>
        <div className={!props.isHome ? "review-list-description" : "review-list-description-short"}>
          {props.description}
        </div>
      </div>
      <div className='review-footer'>
        <div className="read-review-helpful-container">
          {(props.isHome || props.isProfile) && (
            <HashLink to={`/search/${props.venue_id}#reviews-container`} className="link-to-review">
              Read Review
            </HashLink>
          )}
          <div className='helpful-container'>
            <div className={`helpful${(revAnim.likeBounce && appState.user_id != props.user_id) ? ' like-bounce' : ''}`}
              onClick={() => {
                if (appState.authorized) {

                  setRevAnim({ ...revAnim, likeBounce: true });
                  setTimeout(() => {
                    setRevAnim(prev =>
                      ({ ...prev, likeBounce: false }));
                  }, 1100);
                }
              }
              }
            >
              {(appState.authorized && appState.user_id != props.user_id) ? (
                <div className='helpful-count editable' onClick={() => { updateHelpfulCount(props.id, appState.name); }}>
                  {appState.likes.includes(props.id) ? <ThumbUpAltIcon style={{ color: '#FF717C' }}
                  /> : <ThumbUpAltIcon />}
                </div>
              ) : (
                  <div className='helpful-count' >
                    <ThumbUpAltIcon />
                  </div>
                )}
            </div>
            {props.helpful_count}
          </div>
        </div>

        {(props.user_id == appState.user_id || (props.user_id == appState.user_id && (props.isHome || props.isProfile))) && (
          <div className="edit-delete-container">

            <div className='delete-button'
              onClick={handleAlert}
            >
              <DeleteIcon />
            </div>
            <div className='edit-button'
              onClick={handleEdit}>
              <NewReview
                review_id={props.id}
                user_id={props.user_id}
                cleanliness={props.cleanliness}
                socialDistancing={props.social_distancing}
                transaction={props.transaction_process}
                description={props.description}
                overall_rating={props.overall_rating}
                venue_name={props.venue_name}
                venue_id={props.venue_id}
                isProfile={props.isProfile || null}
                isHome={props.isHome || null}
                setOpen={setOpen}
                updateFavouriteReview={props.updateFavouriteReview}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}