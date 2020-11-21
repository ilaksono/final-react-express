import { useState } from 'react';


const initFilter = {
  categories: [],
  catsSelected: [],
  price: [],
  distance: 50000,
  mode: false
};

const useFilter = () => {
  const [filters, setFilters] = useState(initFilter);

  const populateCategories = (results) => {
    const cats = [];
    const price = [];
    if (results.length > 1) {
      results.forEach(result => {
        result.categories.forEach((cat) => {
          if (!cats.includes(cat))
            cats.push(cat);
        });
        if (result.price) {
          if (!price.includes(result.price))
            price.push(result.price);
        }
      });
      return setFilters(({ ...filters, 
        categories: cats, 
        catsSelects: cats, 
        price }));
      return filters;
    }
  };
  //type can be price, categories
  const filterClick = ({ type, value }) => {
    if (type === 'categories')
      type = "catsSelected";
    if (filters[type].length <= 1) {
      if (type === 'price') {
        if (filters.price.includes(value))
          return setFilters({ ...filters, price: [...initFilter.price] });
        else
          return setFilters({ ...filters, price: [...filters.price, value] });
      } else if (type === 'catsSelected') {
        if (filters.catsSelected.includes(value))
          return setFilters({ ...filters, catsSelected: [...filters.categories] });
        else
          return setFilters({ ...filters, catsSelected: [...filters.catsSelected, value] });
      }
    }
    if (type === 'catsSelected') {
      if (filters.catsSelected.length === filters.categories.length) {
        return setFilters({ ...filters, catsSelected: [value] });
      }
    }
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
      if (result.price) {
        setFilters(prev => ({...prev, mode: true }));
      }  
    });
  };
  const setCategoriesSelected = () => {
    setFilters({ ...filters, catsSelected: [...filters.categories] });
  };


  return {
    filters,
    filterClick,
    resetFilters,
    distanceFilterClick,
    populateCategories,
    getPriceFilterMode,
    setCategoriesSelected
  };
};

export default useFilter;