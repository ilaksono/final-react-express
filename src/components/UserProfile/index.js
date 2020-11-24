import 'styles/UserProfile.scss';
import { useEffect } from 'react';
import ReviewList from 'components/BusinessPage/ReviewList';
import Profile from './Profile';
import { useParams } from 'react-router-dom';
import useProfileData from 'hooks/useProfileData';
import ChartSection from './ChartSection';
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
  useEffect(() => {
    getTimeRating(id);
  }, [id]);
  const whom = allUsers.all.find(user => user.id === id);    

  return (
    <div className='user-profile-layout'>
      <Profile whom={whom || {}}/>
      {allUsers.reviews &&
        <div className='review-big-container'>
          <div classname='reviews'>
            <ReviewList
              reviews={allUsers.reviews}
            />
          </div>
        </div>
      }
      <div className='chart-container'>
      <ChartSection data={data}/>
      </div>

    </div>
  );
};

export default UserProfile;