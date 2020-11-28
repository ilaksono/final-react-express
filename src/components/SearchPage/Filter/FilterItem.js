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


const useStyles = makeStyles((theme) => ({
  /*   muiButton: {
      label: {
        width: '10px',
      }
    }, */
  root: {
    width: '15px',
  },
  price: {
    margin: 0,
    paddingRight: 0,
    paddingLeft: 0,
    fontSize: 10,
    borderRadius: 0,
    maxWidth: '15px',
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
  else if (props.type === 'chart-tab'
    && props.selectItems.includes(props.message))
    val = true;

  if (props.type === 'categories' || props.type === 'distance') {
    const clr = val ? 'primary' : 'default';
    return (
      <div className='each-filter'>
        <Switch
          checked={val}
          color={clr}
          size='small'
          name={props.message}
          onClick={props.handleClick}>{props.message}</Switch>
        <label className={ props.type === 'categories' ? 'filter-label' : 'distance-filter-label'}>{props.message}</label>
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
  else if (props.type === 'price') {

    const color = props.selectItems
      .includes(props.message) ? val ?
        'primary' : 'default' : 'default';
    return (
      <div >
        <Button
          color={color}
          variant='contained'
          style={{ maxWidth: '30px' }}
          className={classes[props.name]}
          name={props.message}
          onClick={props.handleClick}>{props.message}</Button>
      </div>
    );
  } else if (props.type === 'chart-tab') {
    const color = props.selectItems
      .includes(props.message) ? val ?
        'primary' : 'default' : 'default';
    return (
      <div >
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