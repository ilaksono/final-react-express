import { useContext, useCallback, useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import MarkerComponent from './MarkerComponent';
import { Link } from 'react-router-dom';
import 'styles/Map.scss';
import { YelpContext } from 'YelpContext.js';

const containerStyle = {
  width: '400px',
  height: 'calc(100vh - 60px)'
};

const Map = props => {

  const {
    mapState,
    refinedResults,
    appState,
    panTo,
    onMapLoad,
    mapRef,
    setLoadingSearch,
    currentPage,
    resultsPerPage
  } = useContext(YelpContext);
  const [map, setMap] = useState(null);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

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

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = mapState.places.slice(indexOfFirstResult, indexOfLastResult);

  let parsedMarkers = [];

  if (mapState.places.length) {
    parsedMarkers = currentResults.map((coord, ind) => {
      return (
        <MarkerComponent label={((currentPage - 1) * resultsPerPage) + ind + 1} {...coord} />
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
          onLoad={() => onMapLoad(map)}
          onUnmount={() => onUnmount(map)}
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
