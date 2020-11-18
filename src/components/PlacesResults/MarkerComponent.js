import {Marker} from '@react-google-maps/api'

const MarkerComponent = ({lat, lng}) => {
  

  return (
    <Marker position={{lat, lng}}/>
  )
}
export default MarkerComponent;