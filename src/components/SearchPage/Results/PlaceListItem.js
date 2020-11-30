import React, { useState, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { YelpContext } from 'YelpContext';
import { useHistory } from 'react-router-dom';


const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
})(Rating);

/* 
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
})); */

const PlaceListItem = (props) => {

  const { getIndividualBusinessData } = useContext(YelpContext);

  const history = useHistory();
  const [hover, setHover] = useState(false);
  const moveToNextPage = () => {
    getIndividualBusinessData(props.id)
      .then(() => {
        history.push(`/search/${props.id}`);
      });
  };

  return (
    <div>
      {props.name === "" && ""}
      {props.name && <div className='result-container'
        onClick={moveToNextPage}
        onMouseOver={() =>
          props.hoverMarker({id:props.id, lat: props.latitude, lng: props.longitude})}
        onMouseOut={() =>
          props.notHoverMarker()}>
        <div className="img-general-info-container">
          <div
            style={{ 
              backgroundImage: `url(${props.image})`,
              width: '30%',
              height: '124px',
              backgroundSize: 'cover',
              marginLeft: '8px',
              marginTop: 'auto',
              marginBottom: 'auto',
              marginRight: '8px',
              borderRadius: '20px',
              filter: 'grayscale(0%)',
              ...(hover && { filter: 'grayscale(0%)', borderRadius: '10px', cursor: 'pointer' })
            }}
            onClick={moveToNextPage}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            src={props.image}
            >
            </div>
          <div className='general-info'>
          <h3 className="venue_name">{props.label}. {props.name}</h3>
          <div className="rating-outer-container">
            <div className="rating-title">
              Yelp Rating:
            </div>
            <Box component="fieldset" mb={0} pb={0} pt={0} borderColor="transparent">
              <Rating name="read-only" precision={0.5} value={props.yelpRating} readOnly size="small" />
            </Box>
            <div className="covid_review_count">
              ({props.yelpRatingCount})
            </div>
          </div>
          <div className="rating-outer-container">
            <div className="rating-title">
              Safe Score:
            </div>
            <Box component="fieldset" mb={0} pb={0} pt={0} borderColor="transparent">
              { isNaN(props.overall_rating) ? "N/A" 
              : <StyledRating
                  name="customized-color"
                  size="small"
                  value={props.overall_rating}
                  precision={0.5}
                  icon={<FavoriteIcon fontSize="inherit" />}
                  readOnly
                />}
            </Box>
            <div className="covid_review_count">
              ({props.reviews.length})
            </div>
          </div>

          <div className="sample-review-container">
            {props.reviews.length > 0 && `"${props.reviews[0].description}"`}
            <div className="sample-review-user">
              {props.reviews.length > 0 && `-${props.reviews[0].username}`}
            </div>
          </div>
        </div>

        
      </div>
      <div className='location'> 
        {props.phone}<br />
        {props.address}<br />
        {props.city}
      </div>
    </div>}
    </div>
  );
};

export default PlaceListItem;
