import { useState } from 'react';


const initFilter = {
  categories: [],
  price: ['$', '$$', '$$$', '$$$$'],
  distance: 50000,
  mode: false
};

const useFilter = () => {
  const [filters, setFilters] = useState(initFilter);

  const populateCategories = (results) => {
    const cats = [];
    if (results.length > 1) {
      results.forEach(result => {
        result.categories.forEach((cat) => {
          if (!cats.includes(cat.title))
            cats.push(cat.title);
        });
      });
      setFilters(({ ...filters, categories: cats }));
    }
  };
  //type can be price, category
  const filterClick = ({ type, value }) => {
    if (filters[type].includes(value)) {
      const cpy = [...filters[type]];
      // cpy[value] = !cpy[value];
      cpy.splice(cpy.indexOf(value), 1);
      return setFilters({ ...filters, [type]: cpy });
    } else {
      const cpy = [...filters[type]];
      cpy.push(value);
      return setFilters({ ...filters, [type]: [...cpy] });
    }
  };
  const distanceFilterClick = (value) => {
    setFilters({ ...filters, distance: value });
  };
  const resetFilters = () => {
    setFilters(initFilter);
  };
  const getPriceFilterMode = (results) => {
    results.forEach((result) => {
      if (result.price)
        setFilters(prev => ({ ...prev, mode: true }));
    });
  };


  return {
    filters,
    filterClick,
    resetFilters,
    distanceFilterClick,
    populateCategories,
    getPriceFilterMode
  };
};

export default useFilter;