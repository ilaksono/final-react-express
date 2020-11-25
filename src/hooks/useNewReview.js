import { useState } from 'react';
const useNewReview = () => {
  const [newReview, setNewReview] 
  = useState(true);
  return {
    newReview,
    setNewReview
  };
};

export default useNewReview;