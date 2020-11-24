import { useContext, Fragment } from 'react';
import { YelpContext } from 'YelpContext';
import ReviewListItem from './ReviewListItem';
import Sort from 'components/Sort';


export default function ReviewList(props) {

  const { sortBy, businessDetails, appState } = useContext(YelpContext);



  const reviews = props.reviews.map(review => {
    return <ReviewListItem
      username={review.username}
      social_distancing={review.socialdistancing}
      transaction_process={review.socialdistancing}
      cleanliness={review.cleanliness}
      overall_rating={review.overall_rating}
      date={review.date}
      helpful_count={review.helpful_count}
      description={review.description}
      id={review.id}
      picture={review.profile_pic}
    />;
  });

  const sortOptions = [
    {
      id: "overall_rating",
      value: "Safe Score"
    },
    {
      id: "helpful_count",
      value: "Helpful Count"
    }
  ];

  const handleSort = (property) => {
    sortBy(businessDetails.reviews,
      property,
      false);
  };
  return (
    <div>
      <div className='sort-group'>
        <h3><strong>Reviews</strong></h3>
        {console.log(props)}
        <Sort sortOptions={sortOptions}
          defaultOption={sortOptions[0].id}
          onClick={handleSort} />
      </div>
      {reviews}
    </div>
  );

}