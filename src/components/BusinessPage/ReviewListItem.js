import {useContext } from 'react';
import { PowerOffSharp } from "@material-ui/icons";
import 'styles/ReviewListItem.scss';
import { YelpContext } from 'YelpContext.js';
import axios from 'axios';


export default function ReviewListItem (props) {

  const {businessDetails, setBusinessDetails, appState} = useContext(YelpContext);


  const updateHelpfulCount = (id) => {
    if (appState.likes.includes(id)) {
      console.log("can't push it again")
      return false;
    }
    return axios.post('/reviews/helpful', {id})
    .then(() => {
      appState.likes.push(id);
      const updatedBusinessDetails = {...businessDetails};
      updatedBusinessDetails.reviews.map(review => review.id === id ? review.helpful_count += 1 : "")
      setBusinessDetails(updatedBusinessDetails)
    })
  };

  return(
    <div class='review-container'>
      <div class='user'>
        <span>{props.username}</span>
      </div>
      <div class='review-content'>
        <div class='review-numbers'>
          {console.log("this is the user info", appState)}
          <span>Clealiness Rating {props.cleanliness}</span><br />
          <span>Social Distancing Rating: {props.social_distancing}</span><br />
          <span>Transaction Process Rating: {props.transaction_process}</span><br />
          <span>Overall Score: {props.overall_rating}    {props.date}</span>
        </div>
        <div>
          <p>{props.description}</p>
        </div>
      </div>
      {appState.authorized === false && <div class='helpful-count'>
        <span>Number of people who have found this Review Helpful: {props.helpful_count}</span>
      </div>
        }
        {appState.authorized === true && <div class='helpful-count'>
          <button onClick={() => {updateHelpfulCount(props.id)}}>Helpful?</button>
          <span>{props.helpful_count}</span>
        </div>}
    </div>
  )
  }