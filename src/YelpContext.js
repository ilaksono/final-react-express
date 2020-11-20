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
    populateCategories } = useFilter();

  const {
    appState,
    submitHandle
  } = useApplicationData();
  const { results, 
    setResults,
     yelpSearch,
    businessDetails,
    setBusinessDetails,
    getIndividualBusinessData } = useYelpData();

  const { refinedResults,
    setRefinedSeed,
    applyPriceFilter,
    applyAllFilters,
    applyDistanceFilter } = useRefinedData();
    
  const { mapState, addResults } = useMapData();
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
      mapState,
      addResults,
      autoComplete,
      resetAutoComplete,
      yelpAutoComplete,
      resetFilters,
      filters,
      filterClick,
      distanceFilterClick,
      populateCategories
    }}>
      {children}
    </YelpContext.Provider>
  );
}