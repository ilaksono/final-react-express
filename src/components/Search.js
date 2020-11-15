import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { useEffect } from 'react';
import {Link} from 'react-router-dom'

const Search = props => {
  const { ready, value, suggestions: { status, data }, setValue, clearSuggestion } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6, lng: () => -79 },
      radius: 200 * 1000
    },
  });
  const onChange = (event) => {
    let latLngPromises = [];
    if (status === 'OK') {
      console.log(data);
      try {
        latLngPromises = data.map(async data => {
          const codes = await getGeocode({ address: data.description });
          const { lat, lng } = await getLatLng(codes[0]);
          return { lat, lng };
        });
      } catch (er) {
        console.log(er);
      }
      Promise.all(latLngPromises).then(data => {
        console.log(data);

        props.addResults(data);
      })
    }
    setValue(event.target.value);
  }
  return (
    <div>
      <input value={value} onChange={event => onChange(event)} />
      <Link to={'/maps'}>
        <button>Go to Maps</button>
      </Link>
    </div>
  );

};


export default Search;