import { Fragment, useState, useContext } from 'react';
import axiosRegister from '../axios/register.js';
import { YelpContext } from 'YelpContext.js';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import 'styles/Register.scss';
import { Button } from '@material-ui/core';

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

const RegisterForm = (props) => {

  const [state, setState] = useState(initReg);
  const classes = useStyles();
  const {
    authorizeUser
  } = useContext(YelpContext);
  const validate = ({ username, email, password }) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!username || !email || !password) {
      if (!username) {
        setState({ ...state, errMsg: 'Username cannot be empty!', errType: 'username' });
        return false;
      }
      else if (!email) {
        setState({ ...state, errMsg: 'Email cannot be empty!', errType: 'email' });
        return false;
      }
      else if (!password) {
        setState({ ...state, errMsg: 'Password cannot be empty!', errType: 'password' });
        return false;
      }
    } else if (!re.test(String(state.email).toLowerCase())) {
      setState({ ...state, errMsg: 'Invalid email', errType:'email' });
    }
    else if (userData.some(user =>
      user.email === email)) {
      setState({ ...state, errMsg: 'Email already in use!', errType: 'email' });
      return false;
    } else if (userData.some(user =>
      user.username === username)) {
      setState({ ...state, errMsg: 'Username already in use!', errType: 'username' });
      return false;
    } else return true;
  };
  const cancel = () => {
    setState(initReg);
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
          setState(initReg);
          props.setModal(prev => ({ ...prev, regOpen: false }));


        });
    else
      return;
  };
  const handleClose = () => {
    props.setModal(prev => ({ ...prev, regOpen: false }));
  };

  const handleChange = (event, type) => {
    setState({ ...state, [type]: event.target.value, errMsg: '', errType: '' });
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
        open={props.modal.regOpen}
      >
        <Fade in={props.modal.regOpen}>
          <div className='register-container'>
            <input placeholder='Username' type='text' value={state.username} onChange={(event) =>
              handleChange(event, 'username')} className={`user-input-item${state.errType === 'username' ? ' error-input' : ''}`} />
            <input type='email' placeholder='Email@gmail.com' value={state.email} onChange={(event) =>
              handleChange(event, 'email')} className={`user-input-item${state.errType === 'email' ? ' error-input' : ''}`} />
            <input type='password' placeholder='Password' value={state.password} onChange={(event) =>
              handleChange(event, 'password')} className={`user-input-item${state.errType === 'password' ? ' error-input' : ''}`} />
            <Button onClick={() => handleClick()}
              variant='contained' color='primary'
              className='user-input-btn'>Register</Button>
            <div className='error'> {state.errMsg && state.errMsg}</div>
          </div>
        </Fade>
      </Modal>
    </>

  );
};
/* // <div>
//   <label>username: </label><input type='text' value={state.username} onChange={(event) => handleChange(event, 'username')} />
//   <label>email: </label><input type='email' value={state.email} onChange={(event) => handleChange(event, 'email')} />
//   <label>password: </label><input type='password' value={state.password} onChange={(event) => handleChange(event, 'password')} />
//   <Button onClick={() => handleClick()} message="Register" />
//   {state.errMsg && <div>{state.errMsg}</div>}
// </div> */

export default RegisterForm;