import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';


const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',

    }}

    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}

    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

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
    marginLeft: theme.spacing(1),
  }
}));

const initAnim = {
  wobble: false,
  spin: false
};

export default function AccountMenu(props) {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [animation, setAnimation] = React.useState(initAnim);


  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleToggle = (event) => {

    setAnimation({ ...animation, spin: true });
    setAnchorEl(event.currentTarget);
  };
  const [cookies, setCookie, removeCookie] = useCookies([0]);


  const logout = () => {
    removeCookie('user_id');
    removeCookie('username');
    removeCookie('profile_pic');
    props.logout();
    setAnchorEl(null);
  };

  return (
    <div className="icon-name-container">
      <div className='profile-icon-container'>
        <div
          className={`profile-circle${location.pathname.match(/^\/user/) && '-selected'}${animation.spin ? ' account-animation' : ''}`}
          onAnimationEnd={() => setAnimation(prev => ({ ...prev, spin: false }))}>
          <i class="fas fa-user" style={{ fontSize: 26 }}
            aria-controls={open ? 'menu-list-grow' : undefined}
            onClick={(event) => handleToggle(event)}></i>
        </div>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          style={{
            top: "40px",
          }}
        >
          <StyledMenuItem onClick={() => history.push(`/users/${props.appState.user_id}`)}>
            <ListItemIcon>
              <i class="far fa-user"></i>
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </StyledMenuItem>
          <StyledMenuItem onClick={logout}>
            <ListItemIcon>
              <i class="fas fa-sign-out-alt"></i>
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </StyledMenuItem>
        </StyledMenu>

      </div>
      <div /* className={animation.wobble ? 'wobble-animation' : ''} */
        onMouseOver={() => setAnimation({ ...animation, wobble: true })}
        onAnimationEnd={() => setAnimation({ ...animation, wobble: false })}
        onClick={() => handleClose('profile')}
        style={{
          cursor: 'pointer'
        }}
      >
        <Link to={`/users/${props.appState.user_id}`}>
          <div>{props.appState.name}</div>

        </Link>
      </div>
    </div>
  );
}