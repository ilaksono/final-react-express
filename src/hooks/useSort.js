import { useState } from 'react';

const sortOptions = [
  {
    id: "overall_rating",
    value: "Safe Score"
  },
  {
    id: "reviewCount",
    value: "Number Of Reviews"
  },
  {
    id: "yelpRating",
    value: "Yelp Rating"
  }
];

const useSort = () => {

  const [sort, setSort] 
  = useState(sortOptions[0].id);
    return {
      sort,
      setSort
    }

};

export default useSort;