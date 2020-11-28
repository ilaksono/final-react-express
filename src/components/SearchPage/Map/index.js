import { useContext, useCallback, useEffect, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import MarkerComponent from './MarkerComponent';
import { YelpContext } from 'YelpContext.js';

const containerStyle = {
  width: '30vw',
  height: 'calc(100vh - 60px)'
};

const Map = props => {

  const {
    mapState,
    appState,
    setLoadingSearch,
    currentPage,
    resultsPerPage,
    panTo,
    onMapLoad,
    mapRef,
  } = useContext(YelpContext);
  const [map, setMap] = useState(null);
  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  

  const center = {
    lat: mapState.center.lat || appState.center.lat || 43,
    lng: mapState.center.lng || appState.center.lng || -79
  };

  useEffect(() => {
    setLoadingSearch(false);
    // eslint-disable-next-line
  }, [mapState.places]);

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;


  let parsedMarkers = [];

  if (mapState.places.length) {
    const currentResults = mapState.places.slice(indexOfFirstResult, indexOfLastResult);
    parsedMarkers = currentResults.map((coord, ind) => {
      return (
        <MarkerComponent
        key={ind}
          label={((currentPage - 1) * resultsPerPage) + ind + 1}
          {...coord}
        />
      );
    });
  }

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };
  return (
    <div className="map-container">
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
        <MarkerComponent
          lat={appState.center.lat}
          lng={appState.center.lng}
          currentLoc={true}
        />
      </GoogleMap>
    </div>
  );
};

export default Map;
