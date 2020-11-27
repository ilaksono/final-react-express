import {useState} from 'react';
const useNewUser = () => {
  const [newRegister, 
    setNewRegister] = 
    useState(false);
  return {
    newRegister,
    setNewRegister
  }
  
}
export default useNewUser;