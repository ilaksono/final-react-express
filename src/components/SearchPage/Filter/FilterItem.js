import 'styles/FilterItem.scss';
import React from 'react';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
// function formatAMPM(date) {
//   var hours = date.getHours();
//   var minutes = date.getMinutes();
//   var ampm = hours >= 12 ? 'pm' : 'am';
//   hours = hours % 12;
//   hours = hours ? hours : 12; // the hour '0' should be '12'
//   minutes = minutes < 10 ? '0' + minutes : minutes;
//   var strTime = hours + ':' + minutes + ' ' + ampm;
//   return strTime;
// }

const classNames = require('classnames');
const useStyles = makeStyles((theme) => ({
  price: {
    margin: 0,
    paddingRight: 0,
    paddingLeft: 0,
    fontSize: 10,
  },
  priceLeft: {
    margin: 0,
    paddingRight: 0,
    paddingLeft: 0,
    fontSize: 10,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20
  },
  priceRight: {
    margin: 0,
    paddingRight: 0,
    paddingLeft: 0,
    fontSize: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20
  },
}));

const FilterItem = props => {
  
  const classes = useStyles();
  let val = false;
  if (props.type === 'price'
    && props.filters.price.includes(props.message)
    && !props.filters.allPrice)
    val = true;
  else if (props.type === 'distance' && props.filters.distance === props.value)
    val = true;
  else if (props.type === 'open' && props.filters.isOpen)
    val = true;
  else if (props.type === 'categories'
    && props.filters.catsSelected.includes(props.message)
    && !props.filters.allCats)
    val = true;

  if (props.type !== 'price') {
    const clr = val ? 'primary' : 'default';
    return (
      <div className='each-filter'>
        <label className='filter-label'>{props.message}</label>
        <Switch
          checked={val}
          color={clr}
          size='small'
          name={props.message}
          onClick={props.handleClick}>{props.message}</Switch>
      </div>
    );
  } 
  // else if (props.type === 'open') {
  //   const clr = val ? 'primary' : 'default';
  //   return (
  //     <div className='each-filter'>
  //       <label className='filter-label'>Open Now {formatAMPM(new Date())}</label>
  //       <Switch
  //         checked={val}
  //         color={clr}
  //         size='small'
  //         name={props.message}
  //         className={filterItemClass}
  //         onClick={props.handleClick}>Open Now {formatAMPM(new Date())}
  //       </Switch>
  //     </div>
  //   );
  // }
  else {

    const color = props.filters.price
      .includes(props.message) ? val ?
      'primary' : 'default' : 'default';
    return (
      <div className='each-filter'>
        <Button
          color={color}
          variant='contained'
          className={classes[props.name]}
          name={props.message}
          onClick={props.handleClick}>{props.message}</Button>
      </div>
    );
  }
};
export default FilterItem;