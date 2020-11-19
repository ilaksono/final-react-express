
import React, { useContext } from 'react';
import useMapData from 'hooks/useMapData';
import useYelpData from "hooks/useYelpData";
import useRefinedData from 'hooks/useRefinedData';
import useApplicationData from 'hooks/useApplicationData';
import useAutoComplete from 'hooks/useAutoComplete';

export const YelpContext = React.createContext();

export function YelpProvider({ children }) {
  const {
    appState,
    submitHandle
  } = useApplicationData();
  const { results, setResults, yelpSearch } = useYelpData();
  const { refinedResults,
    setRefinedSeed,
    applyPriceFilter,
    applyAllFilters,
    applyDistanceFilter } = useRefinedData();
  const { mapState, addResults } = useMapData();
  const { autoComplete, yelpAutoComplete } = useAutoComplete(); 
  return (
    <YelpContext.Provider value={{ 
      results, 
      setResults, 
      yelpSearch, 
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
      yelpAutoComplete
      }}>
      {children}
    </YelpContext.Provider>
  );
}