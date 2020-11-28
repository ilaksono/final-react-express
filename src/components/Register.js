import { useState, useContext } from 'react';
import axios from 'axios';
import { YelpContext } from 'YelpContext.js';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useCookies } from 'react-cookie';

export const userData = [
  {
    username: 'Test User',
    email: 'test@test.ca',
    password: 'password',
    img: 'https://i.imgur.com/LpaY82x.png',
    likes: [],

  },
  {
    username: 'Test User1',
    email: 'test1@test.ca',
    password: 'password',
    img: 'https://i.imgur.com/Nmx0Qxo.png',
    likes: []
  },
  {
    username: 'Test User2',
    email: 'test2@test.ca',
    password: 'password',
    img: 'https://i.imgur.com/T2WwVfS.png',
    likes: []
  },
  {
    username: 'Test User3',
    email: 'test3@test.ca',
    password: 'password',
    img: 'https://i.imgur.com/FK8V841.jpg',
    likes: []
  },
  {
    username: 'Test User4',
    email: 'test4@test.ca',
    password: 'password',
    img: 'https://i.imgur.com/twYrpay.jpg',
    likes: []
  },
  {
    username: 'Test User5',
    email: 'test5@test.ca',
    password: 'password',
    img: 'https://i.imgur.com/TdOAdde.jpg',
    likes: []
  },
  {
    username: 'Test User6',
    email: 'test6@test.ca',
    password: 'password',
    img: 'https://i.imgur.com/3tVgsra.jpg',
    likes: []
  },
  {
    username: 'Test User7',
    email: 'test7@test.ca',
    password: 'password',
    img: 'https://i.imgur.com/iHq8K8Z.jpg',
    likes: []
  },
  {
    username: 'Test User8',
    email: 'test8@test.ca',
    password: 'password',
    img: 'https://i.imgur.com/nPywAp1.jpg',
    likes: []
  },
  {
    username: 'Test User9',
    email: 'test9@test.ca',
    password: 'password',
    img: 'https://i.imgur.com/okB9WKC.jpg',
    likes: []
  },
  {
    username: 'Test User10',
    email: 'test10@test.ca',
    password: 'password',
    img: 'https://i.imgur.com/TdOAdde.jpg',
    likes: []
  },
];

const initReg = {
  username: '',
  email: '',
  password: '',
  errMsg: '',
  errType: '',
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
  const [cookies, setCookie, removeCookie] = useCookies();
  const classes = useStyles();
  const {
    authorizeUser,
    appState,
  } = useContext(YelpContext);
  const validate = ({ username, email, password }) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!username) {
      setState({ ...state, errMsg: 'Username cannot be empty!', errType: 'username' });
      return false;
    }
    if (!email) {
      setState({ ...state, errMsg: 'Email cannot be empty!', errType: 'email' });
      return false;
    }
    if (!password) {
      setState({ ...state, errMsg: 'Password cannot be empty!', errType: 'password' });
      return false;
    }
    if (!re.test(String(state.email).toLowerCase())) {
      setState({ ...state, errMsg: 'Invalid email', errType: 'email' });
      return false;
    }
    return true;
  };


  const handleClick = () => {

    if (validate(state))
      axios.post("/api/users/register", { username: state.username, email: state.email, password: state.password, city: appState.center.city || 'Toronto' })
        .then((res) => {
          console.log("data", res.data);
          if (res.data.username) {
            const currentUser = {
              username: res.data.username,
              profile_pic: res.data.profile_pic
            };
            props.setNewRegister(true);
            setCookie('user_id', res.data.user_id, { path: "/" });
            setCookie('username', res.data.username, { path: "/" });
            setCookie('profile_pic', res.data.profile_pic, { path: "/" });
            authorizeUser(res.data.username, 
              res.data.profile_pic, 
              res.data.user_id, [], []);
            setState(currentUser);
            props.setModal(prev => ({ ...prev, regOpen: false }));
            props.closeSnackBar("login");
            props.closeSnackBar("logout");
            props.setSnackBar(true);
          } else if (res.data === "email exists") {
            setState({ ...state, errMsg: 'Email already in use!', errType: 'email' });
            return false;
          } else if (res.data === "username exists") {
            setState({ ...state, errMsg: 'Username already in use!', errType: 'username' });
            return false;
          }
        })
        .catch(err => { console.log(err); });
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
          <form className='register-container' onSubmit={event => {
            event.preventDefault();
            handleClick();
          }}>
            <input placeholder='Username' type='text' value={state.username} onChange={(event) =>
              handleChange(event, 'username')} className={`user-input-item${state.errType === 'username' ? ' error-input' : ''}`} />
            <input type='email' placeholder='Email@gmail.com' value={state.email} onChange={(event) =>
              handleChange(event, 'email')} className={`user-input-item${state.errType === 'email' ? ' error-input' : ''}`} />
            <input type='password' placeholder='Password' value={state.password} onChange={(event) =>
              handleChange(event, 'password')} className={`user-input-item${state.errType === 'password' ? ' error-input' : ''}`} />
            <Button
              variant='contained' color='primary'
              type='submit'
              className='user-input-btn'>Register</Button>
            {state.errMsg && <div className='error'>
              <i class="fas fa-exclamation-triangle"></i> {state.errMsg}
            </div>}
          </form>
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