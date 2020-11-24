import { Divider } from "@material-ui/core";
import { Fragment, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { YelpContext } from 'YelpContext';
import NewReview from 'components/Review/NewReview';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ReviewList from './ReviewList';
import Photos from './Photos';
import "styles/BusinessPage.scss";
import HoursTable from './HoursTable.js';
import StaticMap from './StaticMap.js';
import PhotoModal from './PhotoModal.js';

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
})(Rating);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '270px',
    float: 'center',
    '& > *': {
      margin: theme.spacing(0.5),
      marginTop: '0px',
      marginBottom: '0px',
    },
  },
  favourite: {
    fontWeight: 'bold',
    color: '#FF717C',
    '&:hover': {
      color: 'rgba(0, 0, 0, 0.54)',
    },
  },
  notFavouriteIcon: {
    color: 'rgba(0, 0, 0, 0.54)',
    '&:hover': {
      color: '#FF717C',
    },

  },
}));

export default function BusinessPage() {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [bigPhoto, setBigPhoto]
    = useState({
      open: false,
      url: ''
    });

  const {
    businessDetails,
    getIndividualBusinessData,
    appState
  } = useContext(YelpContext);

  const { id } = useParams();
  const clickPhoto = () => {
    setBigPhoto(true);
  };

  useEffect(() => {
    if (!businessDetails.id) {
      getIndividualBusinessData(id);
    }
  }, []);

  const now = new Date();
  let dayNum = now.getDay() - 1; // 1 is monday
  if (dayNum < 0)
    dayNum += 7;
  const openNow = () => {
    const time = now.getHours() * 100 + now.getMinutes();
    if (businessDetails.hours[0].open[dayNum].end > time
      && businessDetails.hours[0].open[dayNum].start < time)
      return true;
    else return false;
  };

  const categoryList = businessDetails.categories.map((category, index) => {
    return (
      <div className="category">
        { businessDetails.categories.length === (index + 1) ? `${category.title}` : `${category.title},`}
      </div>
    )
  })

  return (
    <div className='business-page-container'>
      <div className="back-and-message-container">
      <Link to={'/search'}>
          <Button variant="contained" /* onClick={backButton} */><KeyboardBackspaceIcon /></Button>
      </Link>
        { open && (
          <Alert severity="success" className={classes.root} onClose={() => setOpen(false)}>Thanks for leaving a review!</Alert>
        )}
        <div className="right-offset"></div>
      </div>
      {!businessDetails.id && (
        <div className='loading-circle'>
          <CircularProgress size={140} />
        </div>
      )}
      {businessDetails.id &&
        <>
          <div className='images-container'>
            {businessDetails.photos.map(review => {
              return (
                <Photos photos={review} clickPhoto={clickPhoto} />
              );
            })}
          </div>
          {bigPhoto.open &&
            <PhotoModal 
            />}
          <div className='business-container'>
            <div className='info-section'>
              <div className='bus-title'>
                {businessDetails.name}
              </div>
              <div className="bus-data">
                <div className="left-col">
                  <div className="rating-outer-container">
                    <div className="rating-title">
                      Yelp Rating:
                    </div>
                    <Box component="fieldset" mb={0} pb={0} pt={0} borderColor="transparent">
                      <Rating name="read-only" precision={0.5} value={businessDetails.yelpRating} readOnly size="medium" />
                    </Box>
                    <div className="covid_review_count">
                      {businessDetails.yelpRatingCount} reviews
                    </div>
                  </div>
                  <div className="rating-outer-container">
                    <div className="rating-title">
                      Safe Score:
                    </div>
                    <Box component="fieldset" mb={0} pb={0} pt={0} borderColor="transparent">
                      { isNaN(businessDetails.overall_rating) ? "N/A" 
                      : <StyledRating
                          name="customized-color"
                          size="medium"
                          value={businessDetails.overall_rating}
                          precision={0.5}
                          icon={<FavoriteIcon fontSize="inherit" />}
                          readOnly
                        />}
                    </Box>
                    <div className="covid_review_count">
                      {businessDetails.reviews.length} reviews
                    </div>
                  </div>
                  <div className="rating-outer-container">
                    <div className="bus-price">
                      { businessDetails.price } &nbsp; &nbsp; &middot;
                    </div>
                    &nbsp; &nbsp; { categoryList }
                  </div>
                </div>
                <div className="right-col">
                  <div className="row">
                    <div className="icon">
                      <LocationOnIcon />
                    </div>
                    <div className="data">
                    {businessDetails.address},
                    </div>
                  </div>
                  <div className="row">
                    <div className="icon">
                    </div>
                    <div className="data">
                    {businessDetails.city}
                    </div>
                  </div>
                  <div className="row">
                    <div className="icon">

                      <PhoneIcon />
                    </div>
                    <div className="data">
                    {businessDetails.phone}
                    </div>
                  </div>
                </div>
              </div>
              {appState.authorized &&
                <div className='bus-buttons'>
                  <NewReview venue_id={id} name={businessDetails.name} setOpen={setOpen} />

                  {/* RENDER THIS BUTTON WHEN A USER FAVOURITED THE VENUE */}
                  <Button variant="contained" startIcon={<FavoriteIcon />} className={classes.favourite} >Favourite</Button>

                  {/* RENDER THIS BUTTON WHEN A USER HAS NOT YET FAVOURITED THE VENUE */}
                  <Button variant="contained" startIcon={<FavoriteIcon />} className={classes.notFavouriteIcon}>Favourite</Button>
                </div>
              }

              <div className='location-hours'>
                <div className='map-label-group'>
                  <label className='loc-label'>
                    <b>Location &amp; Hours</b></label>
                  <div className='static-map-container'>
                    <StaticMap {...businessDetails} />
                  </div>
                </div>
                {businessDetails.hours &&
                  <div className='table-container'>
                    <HoursTable businessDetails={businessDetails} dayNum={dayNum} openNow={openNow} />
                  </div>
                }
              </div>
            </div>
            <div className='review-big-container'>

              <div className='rating'>
                <strong>Safe Score:</strong> {businessDetails.overall_rating}
                <strong>Yelp Rating:</strong> {businessDetails.yelpRating}
              </div>

              <div className='reviews'>
                {(businessDetails.reviews
                  && businessDetails.reviews.length === 0)
                  && <span>Be the first to write a review!</span>}
                {(businessDetails.reviews
                  && businessDetails.reviews.length > 0)
                  && <ReviewList reviews={businessDetails.reviews}
                  />}
              </div>
            </div>
          </div>
        </>}
    </div >
  );
}

/* <table>
  {businessDetails.hours[0].open[0] &&
    <tr>
      <td>Mon</td>
      <td>{`${businessDetails.hours[0].open[0].start} -
                        ${businessDetails.hours[0].open[0].end}`}</td>
    </tr>}
  {businessDetails.hours[0].open[1] &&
    <tr>
      <td>Tue</td><td>{`${businessDetails.hours[0].open[1].start} -
                        ${businessDetails.hours[0].open[1].end}`}
      </td>
    </tr>}
  {businessDetails.hours[0].open[2] &&
    <tr>
      <td>Wed</td>
      <td>{`${businessDetails.hours[0].open[2].start} -
                  ${businessDetails.hours[0].open[2].end}`}</td>
    </tr>}
  {businessDetails.hours[0].open[3] &&
    <tr>
      <td>Thu</td>
      <td>{`${businessDetails.hours[0].open[3].start} -
                      ${businessDetails.hours[0].open[3].end}`}
      </td>
    </tr>}
  {businessDetails.hours[0].open[4] && <tr>
    <td>Fri</td>
    <td>{`${businessDetails.hours[0].open[4].start} -
                      ${businessDetails.hours[0].open[4].end}`}
    </td>

  </tr>}
  {businessDetails.hours[0].open[5] &&
    <tr>
      <td>Sat</td>
      <td>{`${businessDetails.hours[0].open[5].start} -  ${businessDetails.hours[0].open[5].end}`}</td>

    </tr>}
  {businessDetails.hours[0].open[6] &&
    <tr>
      <td>Sun</td>
      <td>{`${businessDetails.hours[0].open[6].start} -  ${businessDetails.hours[0].open[6].end}`}</td>
    </tr>}
</table> */