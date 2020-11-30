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
import { useLoadScript } from '@react-google-maps/api';
import useLoadToxicity from 'hooks/useLoadToxicity';
import useLocationAuto from 'hooks/useLocationAuto';
export const YelpContext = React.createContext();
const libraries = ["places"]

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
    resetFiltersHandle
    // openFilterClick 
  } = useFilter();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries
  });

  const {
    ready,
    value,
    status,
    data,
    setValue,
    clearSuggestions,
    getPlacesAuto,
    loc
  } = useLocationAuto()

  const {
    appState,
    submitHandle,
    tops,
    getTops,
    authorizeUser,
    loginSubmit,
    logout,
    handleFav,
    handleLikes,
    addSearchCount
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
    sortBy,
    yelpLoading, 
    setYelpLoading,
    resetResults,
    wipeBusinessPage
  } = useYelpData();
  const {
    loadToxic, 
    setLoadToxic
  } = useLoadToxicity();
  const {
    sort,
    setSort
  } = useSort();
  const { refinedResults,
    setRefinedSeed,
    applyPriceFilter,
    applyDistanceFilter,
    resetRefinedResults
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
    handlePageChange,
  resetPagination } = usePagination();

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
      applyDistanceFilter,
      sortBy,
      mapState,
      addResults,
      autoComplete,
      resetAutoComplete,
      yelpAutoComplete,
      resetFilters,
      filters,
      loadToxic,
      setLoadToxic,
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
      isLoaded, 
      loadError,
      yelpLoading,
      setYelpLoading,
      resetResults,
      resetRefinedResults,
      resetPagination,
      handleFav,
      handleLikes,
      resetFiltersHandle,
      addSearchCount,
      ready,
      value,
      status,
      data,
      setValue,
      clearSuggestions,
      getPlacesAuto,
      loc,
      wipeBusinessPage
      // openFilterClick
    }}>
      {children}
    </YelpContext.Provider>
  );
}