import { useState } from 'react';


const initFilter = {
  categories: {},
  price: {},
  distance: 10000
};

const useFilter = () => {
  const [filters, setFilters] = useState(initFilter);

  const populateCategories = (results) => {
    const cats = [];

    for (const result of results) {
      for (const cat of Object.values(result.categories)) {
        if (!cats.includes(cat))
          cats.push(cat);
      }
    }
    return cats;
    // setFilters({...filters, categories: cats});

  };
  //type can be price, category
  const filterClick = ({ type, value }) => {
    if (filters[type][value]) {
      const cpy = [...filters[type]];
      cpy[value] = !cpy[value];
      return setFilters({ ...filters, [type]: cpy });
    } else   
      return setFilters({ ...filters, [type]: {...filters[type], value: true} });
    
  };
  const distanceFilterClick = (value) => {
    setFilters({...filters, distance: value});
  }
  

  return {
    filters,
    filterClick
  };
};

export default useFilter;