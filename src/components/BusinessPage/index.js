import { Divider } from "@material-ui/core";
import {useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { YelpContext } from 'YelpContext';
import NewReview from 'components/Review/NewReview';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReviewList from './ReviewList';
import Photos from './Photos'
import "styles/BusinessPage.scss"



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function BusinessPage() {
  
  const classes = useStyles();
  
  const { 
    businessDetails, 
    getIndividualBusinessData, 
    appState
  } = useContext(YelpContext);
  
    const {id} = useParams();

    useEffect(() => {
      if(!businessDetails.id) {
        getIndividualBusinessData(id)
      }
    },[]);

      return (
        <div>
      {!businessDetails.id && <CircularProgress />}
      {businessDetails.id && <div class='business-container'>
      <div class='images'>
        {businessDetails.photos.map(review => {
          return (
            <Photos photos={review}/>
          )
        })} 
      </div>
      <div class='info-section'>
        <div class='review'>
        {appState.authorized === true && <NewReview venue_id={id} name={businessDetails.name} />}
        </div>
          <div class='title'><br />
            <p>{businessDetails.name}</p>
            </div>
            <div class='rating'>
            <p>Safe Score: {businessDetails.overall_rating}</p>
            <p>Yelp Rating: {businessDetails.yelpRating}</p>
          </div>
          <div class='contact-info'> 
            <span>{businessDetails.address}</span> <br/>
            <span>{businessDetails.city}</span> <br/>
            <span>{businessDetails.phone}</span> <br/>
          </div>
        </div>
        <div class='location-hours'>
          <span>Map</span><br/>
          { businessDetails.hours && <table>
      {businessDetails.hours[0].open[0] && <tr>{`Monday:  ${businessDetails.hours[0].open[0].start} -  ${businessDetails.hours[0].open[0].end}`}  </tr> }
      {businessDetails.hours[0].open[1] && <tr>{`Tuesday:  ${businessDetails.hours[0].open[1].start} -  ${businessDetails.hours[0].open[1].end}`}  </tr> }
      {businessDetails.hours[0].open[2] && <tr>{`Wednesday:  ${businessDetails.hours[0].open[2].start} -  ${businessDetails.hours[0].open[2].end}`}  </tr> }
      {businessDetails.hours[0].open[3] && <tr>{`Thursday:  ${businessDetails.hours[0].open[3].start} -  ${businessDetails.hours[0].open[3].end}`}  </tr> }
      {businessDetails.hours[0].open[4] && <tr>{`Friday:  ${businessDetails.hours[0].open[4].start} -  ${businessDetails.hours[0].open[4].end}`}  </tr> }
      {businessDetails.hours[0].open[5] && <tr>{`Saturday:  ${businessDetails.hours[0].open[5].start} -  ${businessDetails.hours[0].open[5].end}`}  </tr> }
      {businessDetails.hours[0].open[6] && <tr>{`Sunday:  ${businessDetails.hours[0].open[6].start} -  ${businessDetails.hours[0].open[6].end}`}  </tr> }
          </table>}
        </div>
        <div class='reviews'>
        <h3>Reviews:</h3>
        {(businessDetails.reviews && businessDetails.reviews.length === 0) && <span>Be the first to write a review!</span>}
        {(businessDetails.reviews && businessDetails.reviews.length > 0) && <ReviewList reviews={businessDetails.reviews} />}
        </div>
     </div>}
     </div>
  )}