import { useContext, useState, Fragment } from 'react';
import 'styles/Register.scss';
import 'styles/ReviewListItem.scss';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { YelpContext } from 'YelpContext.js';
import axios from 'axios';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NewReview from '../Review/NewReview';
import 'styles/Register.scss';
import { Link } from 'react-router-dom';
import AlertDialog from '../AlertDialog';
import DeleteIcon from '@material-ui/icons/Delete';



export default function ReviewListItem(props) {

  const { businessDetails, setBusinessDetails, appState, getIndividualBusinessData } = useContext(YelpContext);
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

  const [err, setErr] = useState('');

  const showErr = () => {
    setErr('Log in first!');
    setTimeout(() => {
      setErr('');
    }, 2000);
  };

  const updateHelpfulCount = (id, name) => {

    if (props.isProfile) {
      return axios.post('/reviews/helpful', { id, username: name })
        .then((response) => {
          props.profileHelpCount(id, response.data);
          return;
        });
    }

    else if (props.isHome) {
      return axios.post('/reviews/helpful', { id, username: name })
        .then((response) => {
          props.profileHelpCount(id, response.data);
          return;
        });
    }

    else {

      return axios.post('/reviews/helpful', { id, username: name })
        .then((response) => {
          if (response.data === "add") {
            const updatedBusinessDetails = { ...businessDetails };
            updatedBusinessDetails.reviews.map
              (review => review.id === id ?
                review.helpful_count += 1
                : "");
            setBusinessDetails(updatedBusinessDetails);
          }
          if (response.data === "delete") {
            const updatedBusinessDetails = { ...businessDetails };
            updatedBusinessDetails.reviews.map
              (review => review.id === id && review.helpful_count > 0 ?
                review.helpful_count -= 1
                : "");
            setBusinessDetails(updatedBusinessDetails);
          };
        });
    }
  };

  const deleteReview = () => {

    if (props.isHome) {
      return axios.post("/reviews/delete", { id: props.id, user_id: appState.user_id })
        .then(() => {
          props.profileDeleteReview(props.id);
          closeAlert();
        })
        .catch(err => { console.log(err); });
    };

    if (props.isProfile) {
      return axios.post("/reviews/delete", { id: props.id, user_id: appState.user_id })
        .then(() => {
          props.profileDeleteReview(props.id);
          closeAlert();
        })
        .catch(err => { console.log(err); });
    };

    return axios.post("/reviews/delete", { id: props.id, user_id: appState.user_id })
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
  // const pageRedirect = () => {
  //   if(props.isProfile) {

  //   }
  // }



  const formatDateString = date => {
    const newDate = new Date(date);
    const dateShortened = newDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    return dateShortened;
  };

  return (
    <div className='review-container'>
      <AlertDialog open={openAlert} onClose={closeAlert} delete={deleteReview} message={"Are you sure you want to delete"} />
      <div className='header-container'>
        <div className='user'>

          {
            (props.picture && !(props.isProfile || props.isHome)) &&
            <Link to={`/users/${props.user_id}`} >
              <img className='profile-img' src={props.picture} alt='no img found' />
            </Link>
          }
          <div className="username-date">
            <Link to={(props.isProfile || props.isHome) ? `/search/${props.venue_id}` : `/users/${props.user_id}`}>
              <span onClick={props.isProfile ? () => getIndividualBusinessData(props.venue_id) : null} className='review-header-link'>{(props.isProfile || props.isHome) ? props.venue_name : props.username}</span>
            </Link>

            <span className="date">{formatDateString(props.date)}</span>
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
                {props.cleanliness} &nbsp; <FavoriteIcon style={{ fontSize: '16px', color: '#FF717C' }} />
              </td>
              <td className="left">
                Distancing
              </td>
              <td className="right">
                {props.social_distancing} &nbsp;<FavoriteIcon style={{ fontSize: '16px', color: '#FF717C' }} />
              </td>
            </tr>
            <tr className="table-row">
              <td className="left">
                Transaction
              </td>
              <td className="right">
                {props.transaction_process} &nbsp;<FavoriteIcon style={{ fontSize: '16px', color: '#FF717C' }} />
              </td>
              <td className="left">
                Overall
              </td>
              <td className="right">
                {props.overall_rating} &nbsp;<FavoriteIcon style={{ fontSize: '16px', color: '#FF717C' }} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='review-content'>
        <div className='review-numbers'>
          <div className="review-description">
            <p>{props.description}</p>
          </div>
        </div>
      </div>

      <div className='review-footer'>
        <div className='helpful-container'>
          {(appState.authorized && !props.isHome) &&
            <div className='helpful'>
              {appState.user_id !== props.user_id &&
                <div className='helpful-count editable' onClick={() => { updateHelpfulCount(props.id, appState.name); }}>
                  <ThumbUpAltIcon style={{ color: '#1E0253' }} />
                </div>}
              {props.helpful_count}
            </div>}
        </div>
        {props.user_id === appState.user_id && (
          <>
          <div className='helpful-count'>
                <ThumbUpAltIcon style={{ color: '#1E0253' }} />
              </div>
          <div className='delete-button'
            onClick = {handleAlert}
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
              />
            </div>
          </>
        )}


        <div className='error-container'>
          <div className='error'>
            {err && err}
          </div>
        </div>
      </div>
      <div className='home-name-label'>

        {
          props.isHome &&
          <Link to={`/users/${props.user_id}`} >
            <span className='review-header-link'>- {props.username}</span>
          </Link>
        }
      </div>


    </div>
  );
}