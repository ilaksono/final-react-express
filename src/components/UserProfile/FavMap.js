// import { useContext, useCallback, useEffect, useState } from 'react';
// import { GoogleMap, LoadScript } from '@react-google-maps/api';
// import MarkerComponent from './MarkerComponent';
// import 'styles/Map.scss';

// const containerStyle = {
//   width: '30vw',
//   height: 'calc(100vh - 60px)'
// };

// const FavMap = props => {
//   const [map, setMap] = useState(null);

//   const onUnmount = useCallback(function callback(map) {
//     setMap(null);
//   }, []);



//   const center = {
//     lat: appState.center.lat || 43,
//     lng: appState.center.lng || -79
//   };

//   useEffect(() => {
//     setLoadingSearch(false);
//   }, [mapState.places]);

//   const indexOfLastResult = currentPage * resultsPerPage;
//   const indexOfFirstResult = indexOfLastResult - resultsPerPage;
//   const currentResults = mapState.places.slice(indexOfFirstResult, indexOfLastResult);

//   let parsedMarkers = [];

//   if (mapState.places.length) {
//     parsedMarkers = currentResults.map((coord, ind) => {
//       return (
//         <MarkerComponent key={ind} label={((currentPage - 1) * resultsPerPage) + ind + 1} {...coord} />
//       );
//     });
//   }

//   const options = {
//     disableDefaultUI: true,
//     zoomControl: true,
//   };
//   return (
//     <div className="map-container">
//       <LoadScript googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_API_KEY}`}>
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           options={options}
//           center={center}
//           zoom={12}
//           onLoad={() => onMapLoad(map)}
//           onUnmount={() => onUnmount(map)}
//         >
//           { /* Child components, such as markers, info windows, etc. */}
//           {parsedMarkers}
//           <></>
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// };

// export default FavMap;