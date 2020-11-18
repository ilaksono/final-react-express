import Button from 'components/Button/Button';
import { useState } from 'react';

const initLogin = {
  email: '',
  password: '',
  errMsg: ''
};

const LoginForm = props => {

  const [login, setLogin] = useState(initLogin);

  const validate = (event, { email, password }) => {
    event.preventDefault();
    if (!email || !password)
      return setLogin({
        ...login,
        errMsg: 'Fields cannot be empty'
      });
    return props.submitHandle(email, password);
  };

  return (
    <div className='login__container'>
      <form onSubmit={event => event.preventDefault()}>
        <label>I Am Login Form</label>
        <input name='email' type='email' value={login.email} onChange={event => setLogin({ ...login, email: event.target.value })} />
        <input name='password' type='password' value={login.password} onChange={event => setLogin({ ...login, password: event.target.value })} />
        <Button onClick={(event, login) => validate(event, login)} />
      </form>
    </div>);
};

export default LoginForm;