import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    float: 'center',
    '& > *': {
      marginTop: '0px',
      marginBottom: '0px',
    },
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  menu: {
    width: '150px',
  }
}));

const initAnim = {
  wobble: false,
  spin: false
};

export default function AccountMenu(props) {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);/* 
  const [anchorEl, setAnchorEl] = React.useState(null); */
  const [animation, setAnimation] = React.useState(initAnim);
  const handleToggle = () => {
    setAnimation({ ...animation, spin: true });
    setOpen((prevOpen) => !prevOpen);
  };
  const [cookies, setCookie, removeCookie] = useCookies([0]);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    if (event === 'logout') {
      removeCookie('user_id');
      removeCookie('username');
      removeCookie('profile_pic');
      props.logout();
    }
    if (event === 'profile') {
      history.push(`/users/${props.appState.user_id}`);
    }

    setOpen(false);
  };

  return (
    <div className="user-nav-container">
      <div className={animation.wobble ? 'wobble-animation' : ''}
        onMouseOver={() => setAnimation({ ...animation, wobble: true })}
        onAnimationEnd={() => setAnimation({ ...animation, wobble: false })}
        onClick={() => handleClose('profile')}
        style={{
          cursor: 'pointer'
        }}
      >
        {props.appState.name}
      </div>
      <div className='profile-icon-container'>
        <div
          className={`profile-circle${animation.spin ? ' account-animation' : ''}`}
          onAnimationEnd={() => setAnimation(prev => ({ ...prev, spin: false }))}>
          <AccountCircleIcon
            style={{ fontSize: 45, color: 'white' }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}

          />
        </div>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" className={classes.menu} >
                    <MenuItem
                      onClick={() => handleClose('profile')}
                      style={{
                        color: '#1E0253',
                        fontSize: '18px',
                      }}>
                      Profile
                      </MenuItem>
                    <MenuItem
                      style={{
                        color: '#1E0253',
                        fontSize: '18px',
                      }}
                      onClick={() => handleClose('logout')}>
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        {/* <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Link to={`/users/${props.appState.user_id}`}>
            <MenuItem
              onClick={handleClose}
              style={{
                color: '#1E0253',
                fontSize: '18px'
              }}
            >Profile</MenuItem>
          </Link>
          <MenuItem
            style={{
              color: '#1E0253',
              fontSize: '18px'
            }}
            onClick={() =>
              handleClose('logout')}
          >Logout</MenuItem>
        </Menu> */}
      </div>
    </div>

  );
}