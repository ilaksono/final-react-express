import { Marker } from '@react-google-maps/api';
import {useContext} from 'react';
import { YelpContext } from 'YelpContext';
import { useHistory } from 'react-router-dom';

const MarkerComponent = props => {
  const { getIndividualBusinessData, setBusinessDetails} = useContext(YelpContext);
  const history = useHistory();
  const { lat, lng, id, hover, key } = props;
  console.log("props", props);
  const icon = hover ? `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%20|1B2365|FFFFFF` :
    `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%20|FE6256|000000`;
  console.log("marker key", key);
  const handleClick = () => {
    setBusinessDetails('')
    history.push(`/search/${id}`);
  };

  return (
    <Marker
      label={key}
      position={{ lat, lng }}
      icon={icon}
      onClick={handleClick}
    />
  );
};
export default MarkerComponent;