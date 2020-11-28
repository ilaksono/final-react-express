import { useState } from "react";
import axios from 'axios';

const initState = {
  businesses: [],
  categories: []
};

export default function useAutoComplete() {

  const [autoComplete, setAutoComplete] = useState(initState);

  const yelpAutoComplete = (venue, latitude, longitude) => {
    return axios.post('/api/yelp/autocomplete', { venue, latitude, longitude })
      .then((response) => {
        setAutoComplete(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetAutoComplete = () => {
    setAutoComplete(initState);
  };

  return { autoComplete, resetAutoComplete, yelpAutoComplete };
}