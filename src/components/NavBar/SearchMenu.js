import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NavIcon from './NavIcon';
import { YelpContext } from 'YelpContext';
import { useHistory } from 'react-router-dom';

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

export default function CustomizedMenus(props) {

  const history = useHistory();
  const handleClose = () => {
    props.setSearchMenu(null);
  };
  const {
    appState,
    resetResults,
    yelpSearch,
    addSearchCount,
    resetRefinedResults,
    setLoadingSearch,
    resetFilters,
    resetPagination } = useContext(YelpContext);


  const handleSearchClick = (val) => {
    addSearchCount();
    resetResults();
    resetRefinedResults();
    setLoadingSearch(true);
    resetFilters();
    resetPagination();
    yelpSearch(val, appState.center.city);
    history.push('/search');
    props.setSearchMenu(null);
  };
  return (
    <div>
      <div
        style={{
          cursor: 'pointer'
        }}
        className={`${props.animation.searchSpin ? 'account-animation' : ''}`}
        onClick={(event) => {
          props.setSearchMenu(event.currentTarget);
          props.setAnimation({ ...props.animation, searchSpin: true });
        }}
        onAnimationEnd={(() => props.setAnimation({ ...props.animation, searchSpin: false }))}>

        <NavIcon type='search' FAClass='fas fa-search' select={props.select} />

      </div>

      <StyledMenu
        id="customized-menu"
        anchorEl={props.searchMenu}
        keepMounted
        open={Boolean(props.searchMenu)}
        onClose={handleClose}
        style={{
          top: "40px",
        }}
      >
        <StyledMenuItem onClick={() => handleSearchClick('Restaurants')}>
          <ListItemIcon>
            <i class="fas fa-utensils"></i>
          </ListItemIcon>
          <ListItemText primary="Restaurants" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleSearchClick('Shopping')}>
          <ListItemIcon>
            <i class="fas fa-shopping-cart"></i>
          </ListItemIcon>
          <ListItemText primary="Shopping" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleSearchClick('Pharmacies')}>
          <ListItemIcon>
            <i class="fas fa-prescription-bottle-alt"></i>
          </ListItemIcon>
          <ListItemText primary="Pharmacies" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleSearchClick('Coffee')}>
          <ListItemIcon>
            <i class="fas fa-coffee"></i>
          </ListItemIcon>
          <ListItemText primary="Coffee Shops" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
