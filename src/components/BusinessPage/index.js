import { Divider } from "@material-ui/core";
import {useContext, useEffect} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import { YelpContext } from 'YelpContext';
import NewReview from 'components/Review/NewReview';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
  console.log("page loaded")
  const { 
    businessDetails, 
    getIndividualBusinessData, 
    setBusinessDetails } = useContext(YelpContext);
    
    const {id} = useParams();

    useEffect(() => {
      if(!businessDetails.id) {
        getIndividualBusinessData(id)
      }
    })
      return (
      <div class='business-container'>
        <div class='images'> 
            {businessDetails.photos && <img src={businessDetails.photos[0]} alt='photos' class='place-imgs-1'/>}
            {businessDetails.photos && <img src={businessDetails.photos[1]} lass='place-imgs-2'/>}
            {businessDetails.photos && <img src={businessDetails.photos[2]} lass='place-imgs-3'/>}
        </div>
        <NewReview venue_id={id} name={businessDetails.name} />
        <div class='info-section'>
          <div class='title'>
            <span>{businessDetails.name}</span><br/>
            <span>Comfort Rating</span><br/>
            <span>Yelp Rating</span>
          </div>
          <div class='contact-info'> 
            <span>{businessDetails.address}</span> <br/>
            <span>{businessDetails.city}</span> <br/>
            <span>{businessDetails.phone}</span> <br/>
          </div>
        </div>
        <div class='location-hours'>
          <span>Map</span><br/>
          <span>Hours</span>
        </div>
        <div class='reviews'>
        reviews
        </div>
     </div>
  )}