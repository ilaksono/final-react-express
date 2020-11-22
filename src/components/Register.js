import Button from 'components/Button';
import { useState, useContext } from 'react';
import axiosRegister from '../axios/register.js';
import { useHistory } from 'react-router-dom';
import { YelpContext } from 'YelpContext.js';
export const userData = [
  {
    username: 'Test User',
    email: 'test@test.ca',
    password: 'password',
    likes:[]
  }
];

const initReg = {
  username: '',
  email: '',
  password: '',
  errMsg: '',
  likes: []
};
const RegisterForm = (props) => {
  const [state, setState] = useState(initReg);

  const history = useHistory();
  const {
    authorizeUser
  } = useContext(YelpContext);
  const validate = ({ username, email, password }) => {
    if (!username || !email || !password) {
      setState({ ...state, errMsg: 'Fields cannot be empty!' });
      return false;
    } else if (userData.some(user =>
      user.email === email)) {
      setState({ ...state, errMsg: 'Email already in use!' });
      return false;
    } else if (userData.some(user =>
      user.username === username)) {
      setState({ ...state, errMsg: 'Username already in use!' });
      return false;
    } else return true;
  };
  const handleClick = () => {
    if (validate(state))
      axiosRegister(state)
        .then((res) => {
          userData.push({
            username: state.username,
            email: state.email,
            password: state.password,
            likes: state.likes
          });
          authorizeUser(state.username);
          history.push('/');
          setState(initReg);

        });
    else
      return;
  };
  const handleChange = (event, type) => {
    setState({ ...state, [type]: event.target.value });
  };
  return (
    <div>
      <label>username: </label><input type='text' value={state.username} onChange={(event) => handleChange(event, 'username')} />
      <label>email: </label><input type='email' value={state.email} onChange={(event) => handleChange(event, 'email')} />
      <label>password: </label><input type='password' value={state.password} onChange={(event) => handleChange(event, 'password')} />
      <Button onClick={() => handleClick()} message="Register" />
      {state.errMsg && <div>{state.errMsg}</div>}
    </div>

  );
};

export default RegisterForm;