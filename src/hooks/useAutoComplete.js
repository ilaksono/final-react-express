import { useState } from "react";
import axios from 'axios';

export default function useAutoComplete() {

  const [autoComplete, setAutoComplete] = useState({ businesses: [], categories: [] });

  const yelpAutoComplete = (venue, latitude, longitude) => {
    return axios.post('/api/autocomplete_yelp', {venue, latitude, longitude })
    .then((response) => {
    setAutoComplete(response.data);
  })
  .catch((err) => {
    console.log (err)
    }) 
  }
  
return { autoComplete, setAutoComplete, yelpAutoComplete }
}