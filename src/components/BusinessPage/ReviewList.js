import { useContext, Fragment } from 'react';
import { YelpContext } from 'YelpContext';
import ReviewListItem from './ReviewListItem';
import Sort from 'components/Sort';


export default function ReviewList(props) {

  const { sortBy } = useContext(YelpContext);

  const reviews = props.reviews.map(review => {

    return <ReviewListItem
      username={review.user_id}
      social_distancing={review.socialdistancing}
      transaction_process={review.socialdistancing}
      cleanliness={review.cleanliness}
      overall_rating={review.overall_rating}
      date={review.date}
      helpful_count={review.helpful_count}
      description={review.description}
      id={review.id}
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
    },
    {
      id:'date',
      value: 'Date'
    }
  ];

  const handleSort = (property) => {
    sortBy(props.reviews,
      property,
      false, 'review');
  };
  return (
    <div>
      <div className='sort-group'>
        <h3><strong>Reviews</strong></h3>
        <Sort sortOptions={sortOptions}
          defaultOption={sortOptions[0].id}
          onClick={handleSort} />
      </div>
      {reviews}
    </div>
  );

}