import { useContext, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import MarkerComponent from './MarkerComponent';
import { Link } from 'react-router-dom';
import 'styles/Map.scss';
import { YelpContext } from 'YelpContext.js';

const containerStyle = {
  width: '400px',
  height: '100vh'
};

const Map = props => {

  const {
    mapState,
    refinedResults,
    appState,
    panTo,
    onUnmount,
    onMapLoad,
    mapRef,
    setLoadingSearch
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

  useEffect(() => {
    setLoadingSearch(false);
  }, [mapState.places])

  const indexOfLastResult = props.currentPage * props.resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - props.resultsPerPage;
  const currentResults = mapState.places.slice(indexOfFirstResult, indexOfLastResult);
  console.log('crnt', currentResults);

  let parsedMarkers = [];

  if (mapState.places.length) {
    parsedMarkers = currentResults.map((coord, ind) => {
      return (
        <MarkerComponent label={((props.currentPage - 1) * props.resultsPerPage) + ind + 1} {...coord} />
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
