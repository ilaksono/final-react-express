import "styles/PlaceListItem.scss";
import {useContext} from 'react';
import { YelpContext } from 'YelpContext';
import { useHistory } from 'react-router-dom';


const PlaceListItem = (props) => {
  const { getIndividualBusinessData, businessDetails } = useContext(YelpContext);

  const history = useHistory();
  
  
  const moveToNextPage = () => {
    getIndividualBusinessData(props.id)
      .then(() => {
        history.push(`/search/${props.id}`)
      })
  }

  return (
    <div>
      {props.name === "" && ""}
      {props.name && <div class='result-container' onMouseOver={() => props.hoverMarker(props.id)} onMouseOut={() => props.notHoverMarker()}>
        <div class='img-logo'>
          <img src={props.image} alt="Logo" class='venue-image' />
        </div>
        <div class='general-info'>
      <h3 onClick={moveToNextPage} class="venue_name">{props.name}</h3><br />
      <span class='yelp_rating'>Yelp Rating: {props.yelpRating}</span><br />
      <span class='covid_rating'>Safety Rating: NA</span>
      <span class="covid_review_count">{props.reviews.length}</span><br />
      <span class= "review-description">{props.reviews.length > 0 ? `Review: ${props.reviews[0].description}` : ""}</span>
      </div>
      <div class='location'> 
      <span>
        {props.phone}<br />
        {props.address}<br />
        {props.city}
      </span>
      </div>
    </div>}
    </div>
  )
}

export default PlaceListItem;
