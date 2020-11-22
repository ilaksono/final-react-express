import ReviewListItem from './ReviewListItem';

export default function ReviewList(props) {

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
    />
  })

  return (
    <div>
      {reviews}
    </div>
  )

}