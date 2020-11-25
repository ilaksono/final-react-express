import 'styles/UserProfile.scss';
import { useEffect, Fragment, useState } from 'react';
import ReviewList from 'components/BusinessPage/ReviewList';
import Profile from './Profile';
import { useParams } from 'react-router-dom';
import useProfileData from 'hooks/useProfileData';
import ChartSection from './ChartSection';
import useChartData from 'hooks/useChartData';
import ChartTab from 'components/BusinessPage/ChartTab';
import TogglePerDay from 'components/BusinessPage/TogglePerDay';
import { CircularProgress } from '@material-ui/core';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    label: 'Andrew\'s body fat % ',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45, 1, 2, 23, 4, 5, 6, 2]
  }]
};
const initFocus = {
  like: false,
  rev: false
};
const UserProfile = () => {

  const [focus, setFocus] = useState(initFocus);

  const { id } = useParams();
  const { allUsers,
    getTimeRating,
    profileHelpCount
  } = useProfileData();
  const { chartSelect,
    setChartSelect,
    chartOptions,
    chartData,
    setChartData
  } = useChartData();

  useEffect(() => {
    getTimeRating(id);
  }, [id]);

  useEffect(() => {
    if (allUsers.reviews) {
      if (allUsers.reviews.length)
        primeChartData(allUsers.reviews, chartSelect.select);
    }
    // eslint-disable-next-line
  }, [allUsers, chartSelect]);
  const whom = allUsers.all.find(user => user.id == id);
  const changePerDay = () => {
    setChartSelect({
      ...chartSelect,
      perDay: !chartSelect.perDay
    });
  };

  const clickChartTab = (value) => {
    setChartSelect({ ...chartSelect, select: value });
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
        primedLabels.push(primedLabels[0]);
      if (primedVal.length === 1)
        primedVal.push(primedVal[0]);

      setChartData({
        labels: primedLabels,
        datasets: [{
          label: key[k],
          backgroundColor: '#1E0253',
          borderColor: '#1E0253',
          data: primedVal,
        }],
        ready: true
      });
    }
  };
  const formatDateString = date => {
    return new Date(date).toUTCString().split('')
      .slice(5, 10).join('').replace(' ', '-');
  };



  return (
    <div className='user-profile-layout'>
      {
        !chartData.ready ?
          <div className='loading-circle' style={{ marginLeft: '45%' }}>
            <CircularProgress size={140} color="secondary" />
          </div>
          :
          <>
            <div className='profile-container'>
              <Profile 
              whom={whom || {}} 
              length={allUsers.reviews.length} 
              setFocus={setFocus}/>
            </div>
            {allUsers.reviews &&
              <div className={`profile-reviews${focus.rev ? '-hover': ''}`}>

                <div className='review-big-container'>
                  <div classname='reviews'>
                    <ReviewList
                      reviews={allUsers.reviews}
                      isProfile={true}
                      profileHelpCount={profileHelpCount}
                    />
                  </div>
                </div>
              </div>
            }
            <div className='user-chart-container'>
              {chartData.ready &&
                <>
                  <div className='chart-title'>Trends</div>
                  <div className='chart-switch-container'>
                    <ChartTab
                      chartSelect={chartSelect}
                      clickChartTab={clickChartTab}
                    />
                    <TogglePerDay
                      chartSelect={chartSelect}
                      changePerDay={changePerDay}
                      message='per Day' />
                  </div>
                  <ChartSection data={chartData} options={chartOptions} />
                </>
              }
            </div>
          </>
      }
    </div>
  );
};

export default UserProfile;