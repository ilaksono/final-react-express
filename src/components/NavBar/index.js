import { useState, useEffect, useContext, Fragment } from "react";
import logo from "../logo.png";
import axios from 'axios';
import Search from "components/Search";
import Button from "components/Button";
import SnackBar from 'components/SnackBar';
import { Link, useLocation } from 'react-router-dom';
import { YelpContext } from 'YelpContext.js';
import RegisterForm from '../Register';
import LoginForm from '../Login';
import AccountMenu from './AccountMenu';
import { useCookies } from 'react-cookie';
import HomeIcon from '@material-ui/icons/Home';
import NavIcon from './NavIcon';
import CustomizedMenu from './SearchMenu';


const initMod = {
  regOpen: false,
  logOpen: false
};

const initAnim = {
  homeSpin: false,
  searchSpin: false
};

const NavBar = (props) => {
  const location = useLocation();
  const [modal, setModal] = useState(initMod);
  const [isHome, setIsHome] = useState(false);
  const [loginSnackBar, setLoginSnackBar] = useState(false);
  const [logoutSnackBar, setLogoutSnackBar] = useState(false);
  const [registerSnackBar, setRegisterSnackBar] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const { appState, logout, authorizeUser } = useContext(YelpContext);

  const [searchMenu, setSearchMenu] = useState(null);

  useEffect(() => {
    setIsHome(location.pathname === '/');
    let where = '';
    if (location.pathname.match(/^\/users/))
      where = 'profile';
    else if (location.pathname.match(/^\/search/))
      where = 'search';
    else if (location.pathname === '/')
      where = 'home';

    setSelect({ ...initSelect, [where]: true });
  }, [location]);

  useEffect(() => {
    if (cookies.user_id) {
      return axios.post("/api/users/data", { id: cookies.user_id })
        .then(response => {
          const arrayOfLikes = [];
          const arrayOfFavs = [];
          response.data.likes.forEach(like => arrayOfLikes.push(like.id));
          response.data.favs.forEach(favs => arrayOfFavs.push(favs.venue_id));
          authorizeUser(cookies.username, cookies.profile_pic, cookies.user_id, arrayOfLikes, arrayOfFavs);
        });
    }
    // eslint-disable-next-line
  }, []);

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
  const initSelect = {
    home: false,
    search: false,
    profile: false
  };

  const [select, setSelect] = useState(initSelect);
  const [animation, setAnimation] = useState(initAnim);

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
            <div>SafeSpace</div>
          </Link>
        </div>
        {/* <Link to='/search'>
          <div className={location.pathname === '/search' && 'nav-selected'}
            style={{
              position: 'fixed',
              left: '260px'
            }}
          >
            Search
        </div>
        </Link> */}
        {!isHome &&
          props.loadSearch && (
            <Search isHome={false} buttonMessage={<i className="fas fa-search"></i>}
            />
          )}
        <div class='nav-bar-right-container'>

          <Link to='/'>
            <div className={`${animation.homeSpin ? 'account-animation' : ''}`}
              onClick={() => setAnimation({...animation, homeSpin: true})}
              onAnimationEnd={(() => setAnimation({...animation, homeSpin: false}))}
            >
              <NavIcon type='home' FAClass='fas fa-home' select={select} 
              />

            </div>
          </Link>
          
          <CustomizedMenu 
          select={select}
          animation={animation}
          setAnimation={setAnimation}
          searchMenu={searchMenu} 
          setSearchMenu={setSearchMenu}/>
          {appState.authorized ?
            <>
              <AccountMenu appState={appState}
                closeSnackBar={closeSnackBar}
                setSnackBar={setLogoutSnackBar}
                logout={handleLogout}
                >
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
        </div>

      </nav>
    </>
  );

};
export default NavBar;