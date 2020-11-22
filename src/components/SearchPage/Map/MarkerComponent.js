import { Marker } from '@react-google-maps/api';
import {useContext, useEffect} from 'react';
import { YelpContext } from 'YelpContext';
import { useHistory } from 'react-router-dom';

const MarkerComponent = props => {
  const { getIndividualBusinessData, setBusinessDetails} = useContext(YelpContext);
  const history = useHistory();
  const { lat, lng, hover, id, label } = props;
  
  const icon = hover ? `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${label}|1E0253|FFFFFF` :
  `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${label}|FF717C|000000`;

  const handleClick = () => {
    setBusinessDetails('')
    history.push(`/search/${id}`);
  };

  return (
    <Marker
      position={{ lat, lng }}
      onClick={handleClick}
      icon={icon}
    />
  );
};
export default MarkerComponent;