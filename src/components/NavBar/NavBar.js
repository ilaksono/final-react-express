import React from "react";
import logo from "./logo.png";
import "./NavBar.scss";
import VenueSearch from "components/Search/VenueSearch";
import LocationSearch from "components/Search/LocationSearch";
import Button from "components/Button/Button";
import { Link } from 'react-router-dom';

const NavBar = () => {

  return (
    <nav className="nav-bar">
      <div className="logo-container">
        <img src={logo} alt="Logo" />
        SafeSpace
      </div>
      <div className="search-container">
        <VenueSearch />
        <LocationSearch />
        <Button message={<i class="fas fa-search"></i>} search />
      </div>
      <div className="user-container">
        <div className="login">
          <Link to={'/login'}>
            <Button message="Login" nav/>
          </Link>
        </div>
        <div className="register">
          <Link to={'/register'}>
            <Button message="Register" nav/>
          </Link>
        </div>
      </div>
    </nav>
  );

};
export default NavBar;