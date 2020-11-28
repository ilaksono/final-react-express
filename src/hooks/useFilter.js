import { useState } from 'react';


const initFilter = {
  categories: [],
  catsSelected: [],
  price: [],
  distance: 50000,
  open: false,
  mode: false,
  show: true,
  expandCats: false,
  allPrice: true,
  allCats: true,
  // isOpen: false
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
      return setFilters(({
        ...filters,
        categories: cats,
        catsSelected: cats,
        price
      }));
    }
  };
  //type can be price, categories
  const filterClick = ({ type, value }) => {
    if (type === 'categories')
      type = "catsSelected";
    if (filters[type].length <= 1) {
      if (type === 'price') {
        if (filters.price.includes(value))
          return setFilters({ ...filters, price: ['$', '$$', '$$$', '$$$$'], allPrice: true });
        else if (filters.allPrice) {
          return setFilters({ ...filters, price: [value], allPrice: false });
        } else
          return setFilters({ ...filters, price: [...filters.price, value], allPrice: false });
      } else if (type === 'catsSelected') {
        if (filters.catsSelected.includes(value))
          return setFilters({ ...filters, catsSelected: [...filters.categories], allCats: true });
        else
          return setFilters({ ...filters, catsSelected: [...filters.catsSelected, value], allCats: false });
      }
    }
    if (type === 'catsSelected') {
      if (filters.catsSelected.length === filters.categories.length) {
        return setFilters({ ...filters, catsSelected: [value], allCats: false });
      }
    }
    else if (type === 'price' && filters.allPrice)
      return setFilters({ ...filters, price: [value], allPrice: false });
    else if (type === 'catsSelected' && filters.allCats)
      return setFilters({ ...filters, catSelected: [value], allCats: false });
    if (type === 'price' && filters.price.length === 3 && !filters.price.includes(value))
      return setFilters({ ...filters, price: [...filters.price, value], allPrice: true });
    if (type === 'price' && filters.price.length === 4)
      return setFilters({ ...filters, price: [value], allPrice: false });
    if (filters[type].includes(value)) {
      const cpy = [...filters[type]];
      // cpy[value] = !cpy[value];
      cpy.splice(cpy.indexOf(value), 1);
      if (type === 'price')
        return setFilters({ ...filters, [type]: cpy, allPrice: false });
      else if (type === 'catsSelected')
        return setFilters({ ...filters, [type]: cpy, allCats: false });

    } else {
      const cpy = [...filters[type]];
      cpy.push(value);
      if(type === "catsSelected")
        return setFilters({ ...filters, [type]: [...cpy], allCats: false});
      else if(type === 'price')
        return setFilters({ ...filters, [type]: [...cpy], allPrice: false });
    }
  };
  const distanceFilterClick = (value) => {
    setFilters({ ...filters, distance: value });
  };
  // const openFilterClick = () => {
  //   setFilters({...filters, isOpen: !filters.isOpen})
  // }

  const resetFilters = () => {
    setFilters(initFilter);
  };
  const getPriceFilterMode = (results) => {
    results.forEach((result) => {
      if (result.price) {
        setFilters(prev => ({ ...prev, mode: true }));
      }
    });
  };
  const toggleFilterShow = () => {
    setFilters({ ...filters, show: !filters.show });
  };

  const resetFiltersHandle = () => {
    setFilters({...filters, 
      allPrice: true,
      allCats: true,
      distance: 50000,
      price:['$','$$','$$$','$$$$'],
      catsSelected:[...filters.categories]

    })
  }
  const setCategoriesSelected = () => {
    setFilters({ ...filters, catsSelected: [...filters.categories] });
  };

  const expandCategories = () => {
    setFilters({ ...filters, expandCats: !filters.expandCats });
  };


  return {
    filters,
    filterClick,
    resetFilters,
    distanceFilterClick,
    populateCategories,
    getPriceFilterMode,
    setCategoriesSelected,
    toggleFilterShow,
    expandCategories,
    resetFiltersHandle
    // openFilterClick
  };
};

export default useFilter;