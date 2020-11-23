import React from 'react';
import useMapData from 'hooks/useMapData';
import useYelpData from "hooks/useYelpData";
import useRefinedData from 'hooks/useRefinedData';
import useApplicationData from 'hooks/useApplicationData';
import useAutoComplete from 'hooks/useAutoComplete';
import useFilter from 'hooks/useFilter';

export const YelpContext = React.createContext();

export function YelpProvider({ children }) {
  const { filters,
    filterClick,
    resetFilters,
    distanceFilterClick,
    populateCategories,
    getPriceFilterMode,
    setCategoriesSelected,
    expandCategories,
    toggleFilterShow,
    // openFilterClick 
  } = useFilter();

  const {
    appState,
    submitHandle,
    tops,
    getTops,
    authorizeUser,
    loginSubmit,
    logout
  } = useApplicationData();
  const { results,
    setResults,
    yelpSearch,
    businessDetails,
    setBusinessDetails,
    getIndividualBusinessData,
    loadingSearch,
    setLoadingSearch } = useYelpData();

  const { refinedResults,
    setRefinedSeed,
    applyPriceFilter,
    applyAllFilters,
    applyDistanceFilter,
    sortBy } = useRefinedData();
  const { mapState,
    addResults,
    hoverMarker,
    notHoverMarker,
    panTo,
    onUnmount,
    onMapLoad,
    mapRef,
    getCenterPan,
    populateCenter } = useMapData();
  const { autoComplete, resetAutoComplete, yelpAutoComplete } = useAutoComplete();
  return (
    <YelpContext.Provider value={{
      results,
      setResults,
      yelpSearch,
      businessDetails,
      setBusinessDetails,
      getIndividualBusinessData,
      appState,
      submitHandle,
      refinedResults,
      setRefinedSeed,
      applyPriceFilter,
      applyAllFilters,
      applyDistanceFilter,
      sortBy,
      mapState,
      addResults,
      autoComplete,
      resetAutoComplete,
      yelpAutoComplete,
      resetFilters,
      filters,
      filterClick,
      toggleFilterShow,
      distanceFilterClick,
      populateCategories,
      getPriceFilterMode,
      setCategoriesSelected,
      hoverMarker,
      notHoverMarker,
      panTo,
      onUnmount,
      onMapLoad,
      mapRef,
      populateCenter,
      getCenterPan,
      tops,
      logout,
      getTops,
      expandCategories,
      authorizeUser,
      loginSubmit,
      loadingSearch,
      setLoadingSearch
      // openFilterClick
    }}>
      {children}
    </YelpContext.Provider>
  );
}