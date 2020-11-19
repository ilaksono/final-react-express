import React, { useEffect, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import MarkerComponent from './MarkerComponent';
import { Link } from 'react-router-dom';
import 'styles/Map.scss';

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
    <div className="map-container">
      <LoadScript
        googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_API_KEY}`}
      >
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
      </LoadScript>
    </div>
  );
}

export default Map;
