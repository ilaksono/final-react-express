import { useContext, useState } from 'react';
import 'styles/ReviewListItem.scss';
import { YelpContext } from 'YelpContext.js';
import axios from 'axios';
import NewReview from '../Review/NewReview'
import 'styles/Register.scss';
import { Link } from 'react-router-dom';
import AlertDialog from '../AlertDialog'



export default function ReviewListItem(props) {

  const { businessDetails, setBusinessDetails, appState, getIndividualBusinessData } = useContext(YelpContext);
  const [openAlert, setOpenAlert] = useState(false); 

  const [open, setOpen] = useState(false);


  const handleAlert = () => {
    setOpenAlert(true);
  };

  const closeAlert = () => {
    setOpenAlert(false)
  }

  const handleEdit = () => {
    setOpen(true)
  }

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
    } else {

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
    if (props.isProfile) {
      return axios.post("/reviews/delete", {id: props.id, user_id: appState.user_id})
      .then(() => {
        props.profileDeleteReview(props.id)
        closeAlert()
      })
      .catch(err => {console.log(err)})
    };

    return axios.post("/reviews/delete", {id: props.id, user_id: appState.user_id})
    .then(() => {
      const updatedBusinessDetails = {...businessDetails};
      console.log(updatedBusinessDetails.reviews)
      updatedBusinessDetails.reviews.map(review => {
        if (review.id === props.id) {
          const indexOfReview =updatedBusinessDetails.reviews.indexOf(review)
          updatedBusinessDetails.reviews.splice(indexOfReview, 1);
          setBusinessDetails(updatedBusinessDetails)
          closeAlert()
        }
      })
    })
    .catch( err => { console.log(err) })
  }

  

  

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

 

  return (
    <div className='review-container'>
         {console.log("this is props", props)}
      <AlertDialog open={openAlert} onClose={closeAlert} delete={deleteReview} message={"Are you sure you want to delete"}/> 
      <div className='user'>
        <Link to={props.isProfile ? `/search/${props.venue_id}`: `/users/${props.user_id}`}> 
          <span onClick={props.isProfile ? () => getIndividualBusinessData(props.venue_id) : null}className='review-header-link'>{props.isProfile ? props.venue_name : props.username}</span>
        </Link>
        {
          props.picture &&
          <Link to={`/users/${props.user_id}`} >

            <img className='profile-img' src={props.picture} alt='no img found' />
          </Link>
        }
      </div>
      <div className='review-content'>
        <div className='review-numbers'>
          <table className='review-table'>
            <tr>
              <td>
                Cleanliness
              </td>
              <td>
                {props.cleanliness}
              </td>
            </tr>
            <tr>
              <td>
                Distancing
              </td>
              <td>
                {props.social_distancing}
              </td>
            </tr>
            <tr>
              <td>
                Transaction
              </td>
              <td>
                {props.transaction_process}
              </td>
            </tr>
            <tr>
              <td>
                Overall
              </td>
              <td>
                {props.overall_rating}
              </td>
            </tr>
          </table>
          <div>
            <p>{props.description}</p>
          </div>

        </div>
      </div>
      <div className='review-footer'>
        {/*eslint-disable-next-line */}
        {props.user_id !== appState.user_id &&
        <div className='helpful-count'
          onClick={appState.authorized
            ? () => { updateHelpfulCount(props.id, appState.name); } : showErr}>
          <i className="far fa-thumbs-up">{props.helpful_count}
          </i>
        </div>}
        {props.user_id === appState.user_id && 
        <div>
         <div className='helpful-count-user'>
         <i className="far fa-thumbs-up">{props.helpful_count}
         </i>
         </div>
         <div className='delete-button'
          onClick = {handleAlert}
         >
         <i class="fas fa-trash-alt"></i>
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
          />
        </div>
       </div>}
        <div className='error-container'>
          <div className='error'>
            {err && err}
          </div>
        </div>
        <div className='date'>
          {convertTime(props.date)}
        </div>
      </div>

    </div>
  );
}