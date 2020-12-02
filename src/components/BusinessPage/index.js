import { Fragment, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { YelpContext } from 'YelpContext';
import NewReview from 'components/Review/NewReview';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MuiAlert from '@material-ui/lab/Alert';
import SnackBar from 'components/SnackBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ReviewList from './ReviewList';
import Photos from './Photos';
import HoursTable from './HoursTable.js';
import StaticMap from './StaticMap.js';
import PhotoModal from './PhotoModal.js';
import ChartSection from 'components/UserProfile/ChartSection';
import ChartTab from './ChartTab';
import TogglePerDay from './TogglePerDay';
import useChartData from 'hooks/useChartData';
import SimpleGrow from './FavouriteAnimation';
import isOpen from 'helpers/isOpen';

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

const initPhoto = {
  open: false,
  url: ''
};
// const initData = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//   datasets: [{
//     label: 'Andrew\'s body fat % ',
//     backgroundColor: '#1E0253',
//     // backgroundColor: 'rgb(255, 99, 132)',
//     borderColor: 'rgb(255, 99, 132)',
//     data: [0, 10, 5, 2, 20, 30, 45]
//   }],
//   ready: null
// };

// const initOptions = {
//   scales: {
//     yAxes: [{
//       ticks: {
//         min: 0,
//         max: 5
//       }
//     }]
//   }
// };

// const initChartSelect = {
//   options: ['Overall', 'Clean', 'Distancing', 'Process'],
//   select: 'Overall',
//   perDay: false
// };

const initVal = false;

export default function BusinessPage() {

  const classes = useStyles();
  const [nextOpen, setNextOpen] = useState({ day: null, start: null, end: null });
  const [reviewSnackBar, setReviewSnackBar] = useState(initVal);
  const history = useHistory();
  const [avgRatings, setAvgRatings] = useState({ overall_rating: null, cleanliness: null, transactionprocess: null, socialdistancing: null });
  const [bigPhoto, setBigPhoto]
    = useState(initPhoto);
  // const [chartData, setChartData] = useState(initData);
  // const [chartOptions, setChartOptions] = useState(initOptions);
  // const [chartSelect, setChartSelect] = useState(initChartSelect);

  const {
    chartSelect,
    setChartSelect,
    chartOptions,
    chartData,
    setChartData,
  } = useChartData();

  const clickChartTab = (value) => {
    setChartSelect({ ...chartSelect, select: value });
  };
  const {
    businessDetails,
    getIndividualBusinessData,
    appState,
    handleFav,
    wipeBusinessPage,
    resetFiltersHandle
  } = useContext(YelpContext);

  useEffect(() => {
    venueAvgRatings();
  }, [businessDetails]);

  const { id } = useParams();
  const clickPhoto = (url) => {
    setBigPhoto({ open: true, url });
  };
  const changePerDay = () => {
    setChartSelect({
      ...chartSelect,
      perDay: !chartSelect.perDay
    });
  };

  const hideBigPhoto = () => {
    setBigPhoto(initPhoto);
  };

  const initAnim = {
    favGrow: false
  };
  const [busAnim, setBusAnim] = useState(initAnim);

  const venueAvgRatings = () => {
    if (businessDetails.reviews) {
      const reviews = businessDetails.reviews;
      const avgCleanliness = getAvgRating(reviews, "cleanliness");
      const avgOverall = getAvgRating(reviews, "overall_rating");
      const avgTransactionProcess = getAvgRating(reviews, "transactionprocess");
      const avgSocialDistancing = getAvgRating(reviews, "socialdistancing");
      return setAvgRatings({ overall_rating: avgOverall, cleanliness: avgCleanliness, transactionprocess: avgTransactionProcess, socialdistancing: avgSocialDistancing });
    }
  };

  const getAvgRating = (data, property) => {
    let count = 0;
    const sum = data.reduce((acc, review) => {
      if (review[property]) {
        count++;
      }
      return acc + Number(review[property]);
    }, 0);
    return sum / count;
  };


  const primeChartData = (reviews, type) => {
    if (reviews) {
      const key = {
        'overall_rating': 'Overall Rating',
        'cleanliness': 'Cleanliness',
        'socialdistancing': 'Social Distancing',
        'transactionprocess': 'Transaction Process'
      };
      const keyIndex = chartSelect.options.indexOf(type);
      const k = Object.keys(key)[keyIndex];
      let cpy = [...reviews];
      cpy = cpy.sort((a, b) => {
        const leftP = new Date(a.date).getTime();
        const rightP = new Date(b.date).getTime();
        if (isFinite(rightP - leftP)) {
          return leftP - rightP;
        } else {
          return isFinite(leftP) ? -1 : 1;
        }
      });
      let primedLabels = [];
      let primedVal = [];
      let normObj = {};
      if (chartSelect.perDay) {
        cpy.forEach((rev, index) => {
          if (!primedLabels
            .includes(formatDateString(rev.date))) {
            primedLabels.push(formatDateString(rev.date));
            normObj[formatDateString(rev.date)] = [Number(rev[k])];
          } else
            normObj[formatDateString(rev.date)].push(Number(rev[k]));
        });
        primedVal = Object.values(normObj).map(ar => {
          return ar.reduce((acc, v) => acc + v, 0) / ar.length;
        });
      } else {
        primedLabels = cpy.map(rev =>
          formatDateString(rev.date));
        primedVal = cpy.map(rev => rev[k]);
      }
      if (primedLabels.length === 1)
        primedLabels.push(formatNextDayString(primedLabels[0]));
      if (primedVal.length === 1)
        primedVal.push(primedVal[0]);

      // const clr = !chartSelect.perDay ? 'grey' : '#1E0253';
      const delta = primedVal[primedVal.length - 1] - primedVal[0];
      const clr = delta > 0 ? '#164a18' : delta === 0 ? '#1E0253' : '#4a1626';
      setChartData({
        labels: primedLabels,
        datasets: [{
          label: key[k],
          // backgroundColor: 'none',
          borderColor: clr,
          data: primedVal,
          fill: true,
          // hoverBackgroundColor: '#1E0253',
          pointBackgroundColor: clr
          // pointHoverBackgroundColor: '#1E0253'
        }],
        ready: true,
      });
    }
  };

  const formatDateString = date => {
    return new Date(date).toUTCString().split('')
      .slice(5, 11).join('').replace(' ', '-');
  };

  const formatNextDayString = str => {
    let d = str.split('');
    if ((!Number.isNaN(d[0] && !Number.isNaN(d[1]))))
      d[1]++;
    else d[0]++;

    return d.join('').replace(' ', '-');

  };



  useEffect(() => {
    if (!businessDetails.id) {
      getIndividualBusinessData(id);
    } // eslint-disable-next-line
  }, []);

  const checkIfHasReviewedPreviously = (bizReviews) => {
    const check = bizReviews.some(reviews => {
      if (reviews.user_id == appState.user_id) {
        return true;
      }
    });
    if (check) {
      return true;
    }
  };

  const addFavourites = (id) => {
    if (!handleFav(businessDetails.id)) {
      return axios
        .post("/api/favs",
          {
            id: businessDetails.id,
            user_id: appState.user_id
          })
        .catch(er => console.log(er));
    } else {
      return axios
        .delete('/api/favs',
          {
            data:
            {
              biz_id: businessDetails.id,
              user_id: appState.user_id
            }
          })
        .catch(er => console.log(er));
    }
  };

  useEffect(() => {
    if (businessDetails.reviews) {
      if (businessDetails.reviews.length)
        primeChartData(businessDetails.reviews, chartSelect.select);
    }// eslint-disable-next-line
  }, [businessDetails, chartSelect]);
  const now = new Date();
  let dayNum = now.getDay() - 1; // 1 is monday
  if (dayNum < 0)
    dayNum += 7;
  const openNow = () => {


    if (businessDetails.hours) {
      if (businessDetails.hours[0].is_open_now === true
        || businessDetails.hours[0].is_open_now === false)
        return businessDetails.hours[0].is_open_now;
      if (businessDetails.hours[0].open) {
        return isOpen(businessDetails.hours[0].open, dayNum);
      }
    }
    return false;

    // let numOpen = {
    //   0: [],
    //   1: [],
    //   2: [],
    //   3: [],
    //   4: [],
    //   5: [],
    //   6: []
    // };


    // const time = now.getHours() * 100 + now.getMinutes();
    // if (!businessDetails.hours || !businessDetails.hours[0].open[dayNum]) {
    //   return null;
    //   // return !businessDetails.is_closed;
    // }
    // businessDetails.hours[0].open.forEach((val, index) => {
    //   numOpen[val.day].push(index);
    // });
    // if (numOpen[dayNum].length) {

    //   if (Number(businessDetails.hours[0].open[numOpen[dayNum][0]].end) > time
    //     && Number(businessDetails.hours[0].open[numOpen[dayNum][0]]).start < time) {
    //     return businessDetails.hours[0].open[numOpen[dayNum[0]]];
    //   }

    //   if (numOpen[dayNum].length > 1 && Number(businessDetails.hours[0].open[numOpen[dayNum][1]].end) > time
    //     && Number(businessDetails.hours[0].open[numOpen[dayNum][1]].start) < time) {
    //     return businessDetails.hours[0].open[numOpen[dayNum[1]]];
    //   }
    //   if (Number(businessDetails.hours[0].open[dayNum].end) > time
    //     && Number(businessDetails.hours[0].open[dayNum].start) < time) {
    //     return businessDetails.hours[0].open[dayNum];
    //   }
    // } else return false;

  };
  let categoryList = [];
  if (businessDetails.categories) {
    categoryList = businessDetails.categories.map((category, index) => {
      return (
        <div className="category" key={index}>
          {businessDetails.categories.length === (index + 1) 
          ? `${category.title}` 
          : `${category.title},`}
        </div>
      );
    });
  }

  return (
    <div className='business-page-container'>
      <SnackBar message="Thanks for leaving a review!" open={reviewSnackBar} setSnackBar={setReviewSnackBar} />
      <div className="back-and-message-container">
        <Button variant="contained" onClick={() => {
          resetFiltersHandle();
          history.goBack();
        }}><KeyboardBackspaceIcon /></Button>
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

            {businessDetails.photos.map((review, index) => {
              return (
                <Photos key={index} photos={review} clickPhoto={clickPhoto} />
              );
            })}
          </div>
          {bigPhoto.open &&
            <PhotoModal
              url={bigPhoto.url}
              bigPhoto={bigPhoto}
              hideBigPhoto={hideBigPhoto}
            />}
          <div className='business-container'>
            <div className='info-section'>
              <div className='bus-title'>
                {businessDetails.name}
              </div>
              <div className="bus-data">
                <div className="left-col">
                  <div className="bus-data-row">
                    <div className="rating-title-bus">
                      Yelp Rating:
                    </div>
                    <Box component="fieldset" mb={0} pb={0} pt={0} borderColor="transparent">
                      <Rating name="read-only" precision={0.5} value={Number(businessDetails.yelpRating)} readOnly size="medium" />
                    </Box>
                    <div className="covid_review_count">
                      {businessDetails.yelpRatingCount} {businessDetails.yelpRatingCount === 1 ? "review" : "reviews"}
                    </div>
                  </div>
                  <div className="bus-data-row">
                    <div className="rating-title-bus">
                      Safe Score:
                    </div>
                    <Box component="fieldset" mb={0} pb={0} pt={0} borderColor="transparent">
                      {isNaN(Number(businessDetails.overall_rating)) ? "N/A"
                        : <StyledRating
                          name="customized-color"
                          size="medium"
                          value={Number(businessDetails.overall_rating)}
                          precision={0.5}
                          icon={<FavoriteIcon fontSize="inherit" />}
                          readOnly
                        />}
                    </Box>
                    <div className="covid_review_count">
                      {businessDetails.reviews.length} {businessDetails.reviews.length === 1 ? "review" : "reviews"}
                    </div>
                  </div>
                  <div className="bus-data-row">
                    {businessDetails.price && (
                      <div className="bus-price">
                        {businessDetails.price}
                        {categoryList.length && (
                          <div>
                            &nbsp; &middot; &nbsp;
                          </div>
                        )}
                      </div>
                    )}
                    {categoryList}
                  </div>
                  <div className="bus-data-row">
                    {businessDetails.hours && (
                      <>
                        {openNow() ? (
                          <div className="open">
                            Open Now
                          </div>
                        ) : (
                            <>
                              <div className="closed">
                                Closed Now &nbsp;
                        </div>
                              {(nextOpen.day && nextOpen.start && nextOpen.end) && (
                                <div className="category">
                                  &middot; &nbsp; {`Next Open: ${nextOpen.day}, ${nextOpen.start} - ${nextOpen.end}`}
                                </div>
                              )}
                            </>
                          )}
                      </>
                    )}

                  </div>
                </div>
                <div className="right-col">
                  <div className="row">
                    <div className="icon">
                      <LocationOnIcon />
                    </div>
                    <div className="data">
                      {businessDetails.address && businessDetails.address},
                    </div>
                  </div>
                  <div className="row">
                    <div className="icon">
                    </div>
                    <div className="data">
                      {businessDetails.city && businessDetails.city}
                    </div>
                  </div>
                  <div className="row">
                    <div className="icon">

                      <PhoneIcon />
                    </div>
                    <div className="data">
                      {businessDetails.phone && businessDetails.phone}
                    </div>
                  </div>
                </div>
              </div>
              {(appState.authorized && appState.favs) && (
                <div className='bus-buttons'>
                  {!checkIfHasReviewedPreviously(businessDetails.reviews) &&
                    <>
                      <NewReview venue_id={id} name={businessDetails.name} setReviewSnackBar={setReviewSnackBar} />
                    </>
                  }
                  <Button variant="contained"
                    startIcon={<FavoriteIcon />}
                    className={appState.favs.includes(businessDetails.id)
                      ? classes.favourite : classes.notFavouriteIcon}
                    onClick={() => {
                      setBusAnim({ ...busAnim, favGrow: true });
                      setTimeout(() => {
                        setBusAnim(prev => ({ ...prev, favGrow: false }));
                      }, 500);
                      addFavourites(businessDetails.id);
                    }}
                  >
                    Favourite
                    </Button>
                </div>
              )}
              <SimpleGrow busAnim={busAnim} setBusAnim={setBusAnim}
                color={appState.favs.includes(businessDetails.id)
                  ? 'red' : 'grey'}
              />

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
                    <HoursTable businessDetails={businessDetails} dayNum={dayNum} openNow={openNow} setNextOpen={setNextOpen} />
                  </div>
                }
              </div>
            </div>

            <div className='review-chart-container'>
              <div id="reviews-container" >

                {(businessDetails.reviews && businessDetails.reviews.length === 0) ? (
                  <span>Be the first to write a review!</span>
                ) : (
                    <ReviewList
                      reviews={businessDetails.reviews}
                      avgRatings={avgRatings} />
                  )}
              </div>
              <div className='business-chart-container'>
                {chartData.ready &&
                  <>
                    <ChartTab
                      chartSelect={chartSelect}
                      clickChartTab={clickChartTab} />
                    {/* <TogglePerDay
                      chartSelect={chartSelect}
                      changePerDay={changePerDay}
                      message='Daily' /> */}
                    {/* {parsedCharts} */}

                    <ChartSection
                      data={chartData}
                      options={chartOptions} />
                  </>
                }
              </div>
            </div>
          </div>
        </>}

    </div >
  );
}
