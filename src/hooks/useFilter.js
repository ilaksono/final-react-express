import { useState } from 'react';


const initFilter = {
  categories: [],
  price: [],
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
    if (filters[type].includes(value)) {
      const cpy = [...filters[type]];
      cpy.splice(filters[type].indexOf(value), 1);
      return setFilters({ ...filters, [type]: cpy });
    } else
      return setFilters({ ...filters, [type]: [...filters[type], value] });
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