import Button from './Button';
import React, { useState } from 'react';
import axiosRegister from '../axios/register.js';

const RegisterForm = (props) => {
  const [state, setState] = useState({
    username: '',
    email: '',
    password: ''
  });
  const handleClick = () => {

    axiosRegister(state);
  };
  const handleChange = (event, type) => {
    setState({ ...state, [type]: event.target.value });
  };
  return (
    <div>
      <label>username: </label><input type='text' value={state.username} onChange={(event) => handleChange(event, 'username')} />
      <label>email: </label><input type='email' value={state.email} onChange={(event) => handleChange(event, 'email')} />
      <label>password: </label><input type='password' value={state.password} onChange={(event) => handleChange(event, 'password')} />
      <Button onClick={() => handleClick()} message="Register"/>
    </div>

  );
};

export default RegisterForm;