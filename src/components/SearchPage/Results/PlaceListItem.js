
const PlaceListItem = (props) => {
  
  return (
    <div>
      {props.name}
      {props.phone}
      {props.reviewCount}
      {props.price}
      {props.distance && Math.floor(props.distance)}
    </div>
  )
}

export default PlaceListItem;
