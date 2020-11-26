import { useState, useEffect, useContext, Fragment } from "react";
import logo from "../logo.png";
import 'styles/NavBar.scss';
import Search from "components/Search";
import Button from "components/Button";
import SnackBar from 'components/SnackBar';
import { Link, useLocation } from 'react-router-dom';
import { YelpContext } from 'YelpContext.js';
import RegisterForm from '../Register';
import LoginForm from '../Login';
import AccountMenu from './AccountMenu';
const initMod = {
  regOpen: false,
  logOpen: false
};
const NavBar = (props) => {
  const location = useLocation();
  const [modal, setModal] = useState(initMod);
  const [isHome, setIsHome] = useState(false);
  const [loginSnackBar, setLoginSnackBar] = useState(false);
  const [logoutSnackBar, setLogoutSnackBar] = useState(false);
  const [registerSnackBar, setRegisterSnackBar] = useState(false);
  const { appState, logout } = useContext(YelpContext);
  useEffect(() => {
    setIsHome(location.pathname === '/');
  }, [location]);

  const handleLogout = () => {
    logout();
    closeSnackBar("login");
    closeSnackBar("register");
    setLogoutSnackBar(true);
  };

  const closeSnackBar = name => {
    if (name === "login") {
      setLoginSnackBar(false);
    } else if (name === "logout") {
      setLogoutSnackBar(false);
    } else if (name === "register") {
      setRegisterSnackBar(false);
    }
  };
  return (
    <>
    <div className="hidden">
      <SnackBar message="You have successfully logged in!" open={loginSnackBar} setSnackBar={setLoginSnackBar} />
      <SnackBar message="You have successfully logged out!" open={logoutSnackBar} setSnackBar={setLogoutSnackBar} />
      <SnackBar message="You have successfully registered!" open={registerSnackBar} setSnackBar={setRegisterSnackBar} />
    </div>
    <nav className="nav-bar">
      <div className="logo-container">
        <Link to={'/'}>
          <img src={logo} alt="Logo" className='nav-icon' />
              SafeSpace
        </Link>
      </div>
      {!isHome &&
        props.loadSearch && (
          <Search isHome={false} buttonMessage={<i className="fas fa-search"></i>}
          />
        )}
      {appState.authorized ?
        <>
          <AccountMenu appState={appState}
            closeSnackBar={closeSnackBar}
            setSnackBar={setLogoutSnackBar}
            logout={handleLogout}>
          </AccountMenu>
        </>
        :
        <div className="user-container">
          <div className="login">
            {/* <Link to={'/login'}> */}
            <Button message="Login"
              onClick={() =>
                setModal({
                  ...modal,
                  logOpen: true
                })}
              nav />
            {modal.logOpen && <LoginForm
              modal={modal}
              setModal={setModal}
              setSnackBar={setLoginSnackBar}
              closeSnackBar={closeSnackBar}
            />}
            {/* </Link> */}
          </div>
          <div className="register">
            {/* <Link to={'/register'}> */}
            <Button message="Register" onClick={() =>
              setModal({
                ...modal,
                regOpen: true
              })} nav />
            {modal.regOpen && <RegisterForm
              modal={modal}
              setModal={setModal}
              setSnackBar={setRegisterSnackBar}
              closeSnackBar={closeSnackBar}
              setNewRegister={props.setNewRegister}
            />}
            {/* </Link> */}
          </div>
        </div>
      }
    </nav>
    </>
  );

};
export default NavBar;