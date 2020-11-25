import 'styles/UserProfile.scss';
import { useEffect, Fragment } from 'react';
import ReviewList from 'components/BusinessPage/ReviewList';
import Profile from './Profile';
import { useParams } from 'react-router-dom';
import useProfileData from 'hooks/useProfileData';
import ChartSection from './ChartSection';
import useChartData from 'hooks/useChartData';
import ChartTab from 'components/BusinessPage/ChartTab';
import TogglePerDay from 'components/BusinessPage/TogglePerDay';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    label: 'Andrew\'s body fat % ',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45, 1, 2, 23, 4, 5, 6, 2]
  }]
};
const UserProfile = () => {
  const { id } = useParams();
  const { allUsers, getTimeRating } = useProfileData();
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
          if (formatDateString(rev.date) === prevDay
            && !(index === cpy.length - 1)) {
            acc += Number(rev[k]);
            count++;
          } else {
            prevDay = formatDateString(rev.date);
            primedVal.push(acc / count || 1);
            acc = Number(rev[k]);
            count = 1;
            if (index === cpy.length - 1 && cpy.length > 1) {
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



  return (
    <div className='user-profile-layout'>
      <div className='profile-container'>
        <Profile whom={whom || {}} />
      </div>
      {allUsers.reviews &&
        <div className='profile-reviews'>

          <div className='review-big-container'>
            <div classname='reviews'>
              <ReviewList
                reviews={allUsers.reviews}
                isProfile={true}
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
              <ChartTab chartSelect={chartSelect} clickChartTab={clickChartTab} />
              <TogglePerDay chartSelect={chartSelect} changePerDay={changePerDay} message='per Day' />

            </div>
            <ChartSection data={chartData} options={chartOptions} />
          </>
        }
      </div>

    </div>
  );
};

export default UserProfile;