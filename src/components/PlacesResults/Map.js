import React, { useEffect, useRef, useCallback } from 'react';
import { GoogleMap} from '@react-google-maps/api';
import MarkerComponent from './MarkerComponent';
import { Link } from 'react-router-dom';

const api = 'AIzaSyDPN7RgxORR0HLOo0Iq9v2_L2TNlownf2E';
const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 43.745,
  lng: -79.523
};

const Map = props => {
  const [map, setMap] = React.useState(null);
  // const onLoad = React.useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds();
  //   map.fitBounds(bounds);
  //   setMap(map);
  // }, []);
  // const mapRef = useRef();
  // const onMapLoad = useCallback((map) => {
  //   mapRef.current = map;
  // },[])
  // // const panTo = useCallback(({lat, lng}) => {
  // //   mapRef.current.panTo({lat, lng});
  // //   mapRef.current.setZoom(14);
  // // }, [])

  // useEffect(() => {

  // }, [])

  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null);
  // }, []);

  let parsedMarkers = [];
  if(props.mapState) {
  parsedMarkers = props.mapState.places.map((coord, ind) => {
    return (
      <MarkerComponent key={ind} lat={coord.lat} lng={coord.lng} />
    );
  });
  }

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };
  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={6}
        // onLoad={onMapLoad}
        // onUnmount={onUnmount}
        options={options}
      >
        { /* Child components, such as markers, info windows, etc. */}
        {parsedMarkers}
        <></>
      </GoogleMap>
      <Link to={'/search'}>
        <button>Go to Search</button>
      </Link>
    </div>
  );
}

export default Map;
