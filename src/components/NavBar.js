import React from "react";
import logo from "./logo.png";
import 'styles/NavBar.scss';
import Search from "components/Search/Search";
import Button from "components/Button";
import { Link } from 'react-router-dom';

const NavBar = (props) => {

  return (
    <nav className="nav-bar">
      <div className="logo-container">
        <Link to={'/'}>
          <img src={logo} alt="Logo" />
              SafeSpace
        </Link>
      </div>
      {props.loadSearch && (
        <Search setRefinedSeed={props.setRefinedSeed}
          results={props.results}
          setResults={props.setResults}
          buttonMessage={<i class="fas fa-search"></i>}
          yelpSearch={props.yelpSearch}
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