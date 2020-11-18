import {useState} from 'react';


const initFilter = {
  categories:[],
  price: []
}

const useFilter = () => {
  const [filters, setFilters] = useState(initFilter);
  
  const filterClick = ({type, value}) => {
    console.log(type, value);
    if(filters[type].includes(value)) {
      console.log(type, value, 'in array');
      const cpy = [...filters[type]];
      cpy.splice(filters[type].indexOf(value), 1);
      return setFilters({...filters, [type]: cpy});
    } else 
      console.log(type, value, 'no array');

   return setFilters({...filters, [type]: [...filters[type], value]});
  }
  
  return {
    filters,
    filterClick
  }
}

export default useFilter;