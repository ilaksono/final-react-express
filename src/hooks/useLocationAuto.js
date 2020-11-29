import usePlacesAutocomplete from 'use-places-autocomplete';


const useLocationAuto = (lat, lng) => {

  const { ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions } = usePlacesAutocomplete({
      requestOptions: {
        location: {
          lat: () => lat,
          lng: () => lng
        },
        radius: 200 * 1000,
      },
      debounce: 200,
      // defaultValue: appState.center.city || ''
    });

  return {
    ready,
    value,
    status,
    data,
    setValue,
    clearSuggestions
  };


};

export default useLocationAuto;