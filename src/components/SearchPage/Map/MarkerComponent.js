import { Marker } from '@react-google-maps/api';
import { Link } from 'react-router-dom';

const MarkerComponent = ({ lat, lng, id, hover }) => {
  const icon = hover ? `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%20|1B2365|FFFFFF` : 
    `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%20|FE6256|000000`;  

  return (
    <Link to={`/search/${id}`}>
      <Marker position={{ lat, lng }} 
      icon={icon}/>
    </Link>
  );
};
export default MarkerComponent;