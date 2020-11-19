import { useState, useEffect } from "react";
import logo from "./logo.png";
import 'styles/NavBar.scss';
import Search from "components/Search";
import Button from "components/Button";
import { Link, useLocation } from 'react-router-dom';

const NavBar = (props) => {
  const location = useLocation();
  const [isHome, setIsHome] = useState(false);

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
    </nav>
  );

};
export default NavBar;