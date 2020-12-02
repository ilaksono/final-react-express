import {useState} from 'react'

const useLoadToxicity = () => {
  const [loadToxic, setLoadToxic] = useState(false);
  return{
    loadToxic,
    setLoadToxic
  }
  
}

export default useLoadToxicity;

//loadReview, setLoadReview