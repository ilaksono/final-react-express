import {
  StaticGoogleMap,
  Marker,
} from 'react-static-google-map';


const StaticMap = (props) => {
  return (
    <StaticGoogleMap scale='1'
      size="320x210"
      center={`${props.latitude},${props.longitude}`}
      apiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
      <Marker
        label="!"
        color="red"
        location={`${props.latitude},${props.longitude}`}
      />
    </StaticGoogleMap>
  );
};

export default StaticMap;