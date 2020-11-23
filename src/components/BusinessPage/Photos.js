import "styles/BusinessPage.scss"
export default function Photos(props) {
  return (
    <div class='photos'>
      <img src={props.photos} alt='photos' class='bus-images'/>
    </div>
  )
}