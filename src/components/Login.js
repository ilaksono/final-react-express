import Button from 'components/Button';
import { useState, useContext } from 'react';
import { YelpContext } from 'YelpContext';
import { userData } from './Register.js';
import {useHistory} from 'react-router-dom';
const initLogin = {
  email: '',
  password: '',
  errMsg: '',
  likes: []
};

const LoginForm = props => {

  const [login, setLogin] = useState(initLogin);
  const {
    authorizeUser,
    loginSubmit
  } = useContext(YelpContext);
  const handleChange = (type, val) => {
    setLogin({ ...login, errMsg: '', [type]: val });
  };
  const history = useHistory();
  const validate = () => {

    const { email, password } = login;
    if (!email || !password) {
      return setLogin({
        ...login,
        password: '',
        errMsg: 'Fields cannot be empty'
      });
    }
    if (loginSubmit(login , userData)) {
      authorizeUser(loginSubmit( login , userData));
      history.push('/')
      setLogin(initLogin)
    } else setLogin({ ...login, errMsg: 'Failed login attempt!' });
  };

  return (
    <div className='login__container'>
      <form onSubmit={event => event.preventDefault()}>
        <label>I Am Login Form</label>
        <input name='email' type='email' value={login.email} onChange={event => handleChange('email', event.target.value)} />
        <input name='password' type='password'
          value={login.password}
          onChange={event =>
            handleChange('password', event.target.value)} />
        <Button onClick={validate} message='Login' confirm />
        {login.errMsg && <div>{login.errMsg}</div>}
      </form>
    </div>);
};

export default LoginForm;