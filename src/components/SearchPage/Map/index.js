import { useContext, useCallback } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import MarkerComponent from './MarkerComponent';
import { Link } from 'react-router-dom';
import 'styles/Map.scss';
import { YelpContext } from 'YelpContext.js';

const containerStyle = {
  width: '400px',
  height: '578px'
};

const Map = props => {

  const {
    mapState,
    refinedResults,
    appState,
    panTo,
    onUnmount,
    onMapLoad,
    mapRef
  } = useContext(YelpContext);


  const showCenter = useCallback((t) => {
    console.log(mapRef.current.getCenter().lat());
    // console.log(mapRef.current.getCenter());
    console.log({ lat: mapRef.current.getCenter().lat(), lng: mapRef.current.getCenter().lng() });
  }, []);

  const center = {
    lat: mapState.center.lat || appState.center.lat || 43,
    lng: mapState.center.lng || appState.center.lng || -79
  };


  let parsedMarkers = [];

  if (mapState.places.length) {
    parsedMarkers = mapState.places.map((coord, ind) => {
      return (
        <MarkerComponent key={ind} {...coord} />
      );
    });
  }

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };
  return (
    <div className="map-container">
      <LoadScript googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_API_KEY}`}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          options={options}
          center={center}
          zoom={12}
          onLoad={onMapLoad}
          onUnmount={onUnmount}
        >
          { /* Child components, such as markers, info windows, etc. */}
          {parsedMarkers}
          <></>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
