import { Fragment, useState, useContext } from 'react';
import { YelpContext } from 'YelpContext';
import { userData } from './Register.js';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import 'styles/Register.scss';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';


const initLogin = {
  email: '',
  password: '',
  errMsg: '',
  errType: '',
  likes: []
};
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const LoginForm = props => {
  const classes = useStyles();
  const [login, setLogin] = useState(initLogin);
  const {
    authorizeUser,
    loginSubmit
  } = useContext(YelpContext);
  const handleChange = (val, type) => {
    setLogin({ ...login, errMsg: '', [type]: val, errType:'' });
  };
  const validate = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { email, password } = login;
    if (!email || !password) {
      if (!email) {
        return setLogin({
          ...login,
          password: '',
          errMsg: 'Email cannot be empty',
          errType: 'email'
        });
      }
      else if (!password) {
        return setLogin({
          ...login,
          password: '',
          errMsg: 'Password cannot be empty',
          errType: 'password'

        });
      }
    }
    if (loginSubmit(login, userData)) {
      authorizeUser(loginSubmit(login, userData));
      setLogin(initLogin);
      props.setModal(prev => ({ ...prev, logOpen: false }));
    } else if (!re.test(String(login.email).toLowerCase())) {
      setLogin({ ...login, errMsg: 'Invalid email', errType:'email' });
    }
    else setLogin({ ...login, errMsg: 'Failed login attempt!' });
  };
  const handleClose = () => {
    props.setModal(prev => ({ ...prev, logOpen: false }));
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        open={props.modal.logOpen}
      >
        <Fade in={props.modal.logOpen}>
          <div className='register-container'>
            <input type='email' placeholder='Email@gmail.com' value={login.email} onChange={(event) =>
              handleChange(event.target.value, 'email')} className={`user-input-item${login.errType === 'email' ? ' error-input' : ''}`} />
            <input type='password' placeholder='Password' value={login.password} onChange={(event) =>
              handleChange(event.target.value, 'password')} className={`user-input-item${login.errType === 'password' ? ' error-input' : ''}`} />
            <Button onClick={validate}
              variant='contained' color='primary'
              className='user-input-btn'>Login</Button>
            <div className='error'> {login.errMsg && login.errMsg}</div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default LoginForm;

/* <div className='login__container'>
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
</div> */