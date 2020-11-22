import { useState, useEffect, useContext, Fragment } from "react";
import logo from "./logo.png";
import 'styles/NavBar.scss';
import Search from "components/Search";
import Button from "components/Button";
import { Link, useLocation } from 'react-router-dom';
import { YelpContext } from 'YelpContext.js';

const NavBar = (props) => {
  const location = useLocation();

  const [isHome, setIsHome] = useState(false);
  const { appState, logout } = useContext(YelpContext);
  useEffect(() => {
    setIsHome(location.pathname === '/');
  }, [location]);

  return (
    <nav className="nav-bar">
      <div className="logo-container">
        <Link to={'/'}>
          <img src={logo} alt="Logo" />
              SafeSpace
        </Link>
      </div>
      {!isHome &&
        props.loadSearch && (
          <Search buttonMessage={<i class="fas fa-search"></i>}
          />
        )}
      {appState.authorized ?
        <>
          <div>
            Hello, {appState.name}
          </div>
          <div>
            <Link to='/'>
              <Button message='Logout' onClick={logout} nav />
            </Link>
          </div>
        </>
        :
        <div className="user-container">
          <div className="login">
            <Link to={'/login'}>
              <Button message="Login" nav />
            </Link>
          </div>
          <div className="register">
            <Link to={'/register'}>
              <Button message="Register" nav />
            </Link>
          </div>
        </div>
      }
    </nav>
  );

};
export default NavBar;