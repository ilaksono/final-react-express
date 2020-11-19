import {useState} from 'react';


const initRemoved = {};

const useRemoveElements = () => {
  const [removePlaces, setRemovePlaces] = useState(initRemoved);
  
  const getRemovedPlaces = ({type, removed}) => {
    setRemovePlaces({...removePlaces, [type]: removed});
  }

  const pushRemovedPlaces = ({type}) => {
    const elements = removePlaces[type];
    const cpy = {...removePlaces};
    delete cpy[type];
    setRemovePlaces(cpy);
    return elements || null;
  }

  return {
    removePlaces,
    getRemovedPlaces,
    pushRemovedPlaces
  }


}

export default useRemoveElements;