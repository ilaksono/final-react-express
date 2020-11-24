import { Divider } from "@material-ui/core";
import { Fragment, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { YelpContext } from 'YelpContext';
import NewReview from 'components/Review/NewReview';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReviewList from './ReviewList';
import Photos from './Photos';
import "styles/BusinessPage.scss";
import 'styles/ChartSection.scss';
import HoursTable from './HoursTable.js';
import StaticMap from './StaticMap.js';
import PhotoModal from './PhotoModal.js';
import ChartSection from 'components/UserProfile/ChartSection';
import ChartTab from './ChartTab';
import TogglePerDay from './TogglePerDay';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
const initPhoto = {
  open: false,
  url: ''
};
const initData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    label: 'Andrew\'s body fat % ',
    backgroundColor: '#1E0253',
    // backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45]
  }],
  ready: null
};

const initOptions = {
  scales: {
    yAxes: [{
      ticks: {
        min: 0,
        max: 5
      }
    }]
  }
};

const initChartSelect = {
  options: ['Overall', 'Clean', 'Distancing', 'Process'],
  select: 'Overall',
  perDay: false
};

export default function BusinessPage() {

  const classes = useStyles();
  const [bigPhoto, setBigPhoto]
    = useState(initPhoto);
  const [chartData, setChartData] = useState(initData);
  const [chartOptions, setChartOptions] = useState(initOptions);
  const [chartSelect, setChartSelect] = useState(initChartSelect);

  const clickChartTab = (value) => {
    setChartSelect({ ...chartSelect, select: value });
  };
  const {
    businessDetails,
    getIndividualBusinessData,
    appState
  } = useContext(YelpContext);


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
      let prevDay = formatDateString(cpy[0].date);
      let acc = 0;
      let count = 0;
      if (chartSelect.perDay) {
        cpy.forEach(rev => {
          if (!primedLabels
            .includes(formatDateString(rev.date)))
            primedLabels.push(formatDateString(rev.date));
        });
        cpy.forEach((rev, index) => {
          if (formatDateString(rev.date) === prevDay && !(index === cpy.length - 1)) {
            acc += Number(rev[k]);
            count++;
          } else {
            prevDay = formatDateString(rev.date);
            primedVal.push(acc / count);
            acc = Number(rev[k]);
            count = 1;
            if (index === cpy.length - 1) {
              if (prevDay === formatDateString(rev.date))
                primedVal.push((acc + Number(rev[k])) / (count + 1));
              else primedVal.push(Number(rev[k]));
            }

          }
        });

      } else {
        primedLabels = cpy.map(rev => {
          return formatDateString(rev.date);
        });
        primedVal = cpy.map(rev => rev[k]);
      }


      setChartData({
        labels: primedLabels,
        datasets: [{
          label: key[k],
          backgroundColor: '#1E0253',
          borderColor: '#1E0253',
          data: primedVal
        }],
        ready: true
      });
    }
  };

  const formatDateString = date => {
    return new Date(date).toUTCString().split('')
      .slice(5, 10).join('').replace(' ', '-');
  };

  useEffect(() => {
    if (!businessDetails.id) {
      getIndividualBusinessData(id);
    }
  }, []);

  useEffect(() => {
    primeChartData(businessDetails.reviews, chartSelect.select);
  }, [businessDetails, chartSelect]);

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

  return (
    <div className='business-page-container'>
      <div className='loading-circle'>
        {!businessDetails.id && <CircularProgress size={140} />}
      </div>
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
              url={bigPhoto.url}
              bigPhoto={bigPhoto}
              hideBigPhoto={hideBigPhoto}
            />}
          <div className='business-container'>
            <div className='info-section'>
              <div className='bus-title'>
                {businessDetails.name}
              </div>
              {appState.authorized &&
                <div className='review'>
                  <NewReview venue_id={id} name={businessDetails.name}
                  />
                </div>
              }

              <div className='location-hours'>
                <div className='map-label-group'>
                  <label className='loc-label'>
                    <b>Location &amp; Hours</b></label>
                  <div className='static-map-container'>
                    <StaticMap {...businessDetails} />
                  </div>
                  <div className='contact-info'>
                    <span>{businessDetails.address}</span>
                    <span>{businessDetails.city}</span>
                    <span>{businessDetails.phone}</span>
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
            <div className='business-chart-container'>
              {chartData.ready &&
                <>
                  <ChartTab chartSelect={chartSelect} clickChartTab={clickChartTab} />
                  <TogglePerDay chartSelect={chartSelect} changePerDay={changePerDay} message='per Day'/>
                  {/* {parsedCharts} */}

                  <ChartSection data={chartData} options={chartOptions} />


                </>
              }
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