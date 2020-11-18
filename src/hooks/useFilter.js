import {useState} from 'react';


const initFilter = {
  categories:[],
  price: ['$', '$$', '$$$', '$$$$']
}

const useFilter = () => {
  const [filters, setFilters] = useState(initFilter);



  return {
    filters,
    setFilters
  }
}

export default useFilter;