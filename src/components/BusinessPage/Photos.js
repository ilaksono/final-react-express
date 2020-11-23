import "styles/BusinessPage.scss"
export default function Photos(props) {
  return (
    <div class='photos'>
      <img src={props.photos} 
      onClick={props.clickPhoto} 
      alt='photos' 
      className='bus-images'/>
    </div>
  )
}