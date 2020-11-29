import usePlacesAutocomplete from 'use-places-autocomplete';
import axios from 'axios';
import { useState } from 'react';

const initLoc = {
  val:'',
  suggest: []
};


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

  const [loc, setLoc] = useState(initLoc);
  const getPlacesAuto = async (str) => {
    try {
      const response = await axios
        .get(`/api/places/${str}`);
      setLoc({...loc, suggest: response.data.predictions})

    } catch (er) {
      console.log(er);
    }

  };

  return {
    ready,
    value,
    status,
    data,
    setValue,
    clearSuggestions,
    getPlacesAuto,
    loc

  };



};

export default useLocationAuto;