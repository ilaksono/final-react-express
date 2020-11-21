import { PowerOffSharp } from "@material-ui/icons";
import 'styles/ReviewListItem.scss'


export default function ReviewListItem (props) {

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
        <button>Helpful?</button>
        <span>{props.helpful_count}</span>
      </div>
    </div>
  )
  }