import usePlacesAutocomplete, { getGeocode, getLatLng, getDetails } from 'use-places-autocomplete';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const flatten = arr => {
  arr.forEach((val, i) => {
    if (Array.isArray(val)) {
      arr.splice(i, 1, ...arr[i]);
    }
  });
  return arr;
};
const Search = props => {
  const { ready, value, suggestions: { status, data }, setValue, clearSuggestion } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6, lng: () => -79 },
      radius: 50 * 1000
    },
  });
  const onChange = (event) => {
    let latLngPromises = [];
    if (status === 'OK') {
      // console.log(data);
      try {
        latLngPromises = data.map(async res => {
          // console.log(res);
          const codes = await getGeocode({ address: res.description }).then(desc => {
            // console.log(desc);
            return desc;
          });
          // codes.map((code) => {
          //   const A = getDetails({placeId: code.place_id})
          //   .then(response => console.log(response));
          // })
         const address = await getDetails({placeId: codes[0].place_id })
          // console.log(codes);
          // const arr = codes.map(async add => {
          //   return getLatLng(add);
          // });
          // return arr;

          const { lat, lng } = await getLatLng(address).then(desc => {
            console.log(desc);
            return desc;
          });
          return { lat, lng };
        });
      } catch (er) {
        console.log(er);
      }
      latLngPromises = flatten(latLngPromises);
      // console.log(latLngPromises);
      Promise.all(latLngPromises)
        .then(data => {
          // console.log(data);
          props.addResults(data);
        });
    }
    setValue(event.target.value);
  };
  return (
    <div>
      <input value={value} onChange={event => onChange(event)} />
      <div className='results-container'>
        {status === 'OK' && data.map(({ id, description }) => <div>{description}</div>)}
      </div>
      <Link to={'/maps'}>
        <button>Go to Maps</button>
      </Link>
    </div>
  );

};



export default Search;