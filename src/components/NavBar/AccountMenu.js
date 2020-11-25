import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import 'styles/NavBar.scss';
import { Link } from 'react-router-dom';

export default function AccountMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (type) => {
    setAnchorEl(null);
    if (type === 'logout')
      props.logout();
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <i className="far fa-user account-icon">
        </i>      </Button>
      <Menu
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
      </Menu>
    </div>
  );
}