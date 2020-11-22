import {useContext } from 'react';
import { PowerOffSharp } from "@material-ui/icons";
import 'styles/ReviewListItem.scss';
import { YelpContext } from 'YelpContext.js';
import axios from 'axios';


export default function ReviewListItem (props) {

  const {businessDetails, setBusinessDetails } = useContext(YelpContext);


  const updateHelpfulCount = (id) => {
    return axios.post('/reviews/helpful', {id})
    .then(() => {
      const updatedBusinessDetails = {...businessDetails};
      updatedBusinessDetails.reviews.map(review => review.id === id ? review.helpful_count += 1 : "")
      setBusinessDetails(updatedBusinessDetails)
    })
  };

  return(
    <div class='review-container'>
      <div class='user'>
        <span>{props.username}(user)</span>
      </div>
      <div class='review-content'>
        <div class='review-numbers'>
          <span>Clealiness Rating {props.cleanliness}</span><br />
          <span>Social Distancing Rating: {props.social_distancing}</span><br />
          <span>Transaction Process Rating: {props.transaction_process}</span><br />
          <span>Overall Score: {props.overall_rating}    {props.date}</span>
        </div>
        <div>
          <p>{props.description}</p>
        </div>
      </div>
      <div class='helpful-count'>
        <button onClick={() => {updateHelpfulCount(props.id, props.helpful_count)}}>Helpful?</button>
        <span>{props.helpful_count}</span>
      </div>
    </div>
  )
  }