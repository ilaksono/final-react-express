import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const api = 'AIzaSyDPN7RgxORR0HLOo0Iq9v2_L2TNlownf2E'
const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function MyComponent() {
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

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
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MyComponent)

// import React from 'react';
// import ReactGoogleMapLoader from 'react-google-maps-loader';
// const Map = () => {
//   return (
//   <ReactGoogleMapLoader
//     params={{
//       key: api,
//       libraries:'places, geometry'
//     }}
//     render={googleMaps => {
//       console.log(googleMaps);

//     return googleMaps && <div>Hi</div>
//     }}
    
//     />
//   )
// }
// export default Map;