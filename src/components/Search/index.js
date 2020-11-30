import { useState, useEffect, useContext } from "react";
import Venue from "components/Search/Venue/";
import VenueAutoComplete from "components/Search/VenueAutoComplete/";
import Location from "components/Search/Location/";
import Button from "components/Button/";
import { YelpContext } from 'YelpContext.js';
import { Link, useHistory } from 'react-router-dom';
import usePlacesAutocomplete from 'use-places-autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';


const Search = props => {
  const history = useHistory();
  const {
    results,
    appState,
    yelpSearch,
    autoComplete,
    resetAutoComplete,
    yelpAutoComplete,
    resetFilters,
    populateCategories,
    addResults,
    getPriceFilterMode,
    setLoadingSearch,
    handlePageChange,
    setRefinedSeed,
    resetRefinedResults,
    yelpLoading,
    loadingSearch,
    resetPagination,
    addSearchCount,
    ready,
    value,
    status,
    data,
    setValue,
    clearSuggestions,
    getPlacesAuto,
    loc,
    
  } = useContext(YelpContext);
  const [venue, setVenue] = useState("");
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  // const [location, setLocation] = useState('')
  
  // const { ready,
  //   value,
  //   suggestions: { status, data },
  //   setValue,
  //   clearSuggestions } = usePlacesAutocomplete({
  //     requestOptions: {
  //       location: {
  //         lat: () => appState.center.lat,
  //         lng: () => appState.center.lng
  //       },
  //       radius: 200 * 1000,
  //     },
  //     debounce: 200,
  //     // defaultValue: appState.center.city || ''
  //   });

  useEffect(() => {
    if (appState.searchCount === 0 && appState.center.city)
      setValue(`${appState.center.city}, ${appState.center.region}`, false);
  }, [appState]);


  useEffect(() => {
    setRefinedSeed(results);
    populateCategories(results);
    // addResults(results);
    getPriceFilterMode(results);
    // eslint-disable-next-line
  }, [results]);

  const setVenueAndHandleSearch = (text) => {
    setVenue(text);
    setAutoCompleteFalse();
    handleSearch(text);
    history.push('/search');
  };

  const setVenueAndAutoComplete = (text) => {
    if (text === "") {
      resetAutoComplete();
    }
    if (text !== "") {
      resetAutoComplete();
      yelpAutoComplete(text, appState.center.lat, appState.center.lng);
    }
    setVenue(text);
    setAutoCompleteTrue();
  };

  const setAutoCompleteFalse = () => {
    setShowAutoComplete(false);
  };

  const setAutoCompleteTrue = () => {
    setShowAutoComplete(true);
  };

  const handleSearch = (name) => {
    resetRefinedResults();
    resetPagination();
    addSearchCount();
    setLoadingSearch(true);
    if (name) {
      yelpSearch(name, value); // value = location
    } else {
      yelpSearch(venue, value); // value = location
    }
    // handlePageChange(null, 1);
    resetFilters();
  };


  return (
    <div className={props.isHome ? 'home-search' : "search-container"}>
      <Venue venue={venue} onChange={setVenueAndAutoComplete} onClick={setVenueAndAutoComplete}
        isHome={props.isHome} />
      {showAutoComplete &&
        <VenueAutoComplete
          data={autoComplete}
          setAutoCompleteFalse={setAutoCompleteFalse}
          onClick={setVenueAndHandleSearch}
          isHome={props.isHome}
        />
      }
      <Location
        ready={ready}
        value={value}
        status={status}
        data={data}
        // location={location}
        // setLocation={setLocation}
        setValue={setValue}
        clearSuggestions={clearSuggestions}
        appState={appState}
        isHome={props.isHome}
        getPlacesAuto={getPlacesAuto}
        loc={loc}

      />
      <Link to={'/search'}>
        <Button onClick={() => {
          setLoadingSearch(true);
          resetRefinedResults();
          handleSearch();
        }} message={props.buttonMessage} search isHome={props.isHome} >
          {loadingSearch && <CircularProgress size={20} color='primary' />}</Button>
      </Link>
    </div>
  );
};

export default Search;