import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import MarkerComponent from './MarkerComponent'
const api = 'AIzaSyDPN7RgxORR0HLOo0Iq9v2_L2TNlownf2E'
const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function MyComponent(props) {
  const [map, setMap] = React.useState(null);
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);
  const markersArr = []
  if (props.places) {
    props.markers.map();
  }

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <LoadScript
      googleMapsApiKey={api}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */}
        <MarkerComponent lat={-35} lng={120}/>
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MyComponent)
