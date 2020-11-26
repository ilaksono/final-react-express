import React from 'react';
import useMapData from 'hooks/useMapData';
import useYelpData from "hooks/useYelpData";
import useRefinedData from 'hooks/useRefinedData';
import usePagination from 'hooks/usePagination';
import useApplicationData from 'hooks/useApplicationData';
import useAutoComplete from 'hooks/useAutoComplete';
import useFilter from 'hooks/useFilter';
import useSort from 'hooks/useSort';
import useNewReview from 'hooks/useNewReview';

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
    setLoadingSearch,
    submitNewReview,
    sortBy
  } = useYelpData();

  const {
    sort,
    setSort
  } = useSort();
  const { refinedResults,
    setRefinedSeed,
    applyPriceFilter,
    applyAllFilters,
    applyDistanceFilter,
    // sortBy 
  } = useRefinedData();
  const { mapState,
    addResults,
    hoverMarker,
    notHoverMarker,
    panTo,
    onMapLoad,
    mapRef,
    getCenterPan,
    populateCenter } = useMapData();
  const { autoComplete, resetAutoComplete, yelpAutoComplete } = useAutoComplete();
  const {
    currentPage,
    setCurrentPage,
    maxPageNumber,
    setMaxPageNumber,
    resultsPerPage,
    handlePageChange } = usePagination();

  const {
    newReview, setNewReview
  } = useNewReview();
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
      setLoadingSearch,
      sort,
      setSort,
      currentPage,
      setCurrentPage,
      maxPageNumber,
      setMaxPageNumber,
      handlePageChange,
      resultsPerPage,
      submitNewReview,
      newReview,
      setNewReview,
      
      // openFilterClick
    }}>
      {children}
    </YelpContext.Provider>
  );
}