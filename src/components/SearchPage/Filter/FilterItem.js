import 'styles/FilterItem.scss';
import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


const classNames = require('classnames');

const FilterItem = props => {
  const filterItemClass = classNames
    ('filter-btn', {
      'price-selected-true': props.filters.price.includes(props.message)
      ,
      'distance-selected-true': props.filters.distance === props.value,
      'category-selected-true': props.filters.catsSelected.includes(props.message)
    });
  let val = false;
  if (props.type === 'price' && props.filters.price.includes(props.message))
    val = true;
  else if (props.type === 'distance' && props.filters.distance === props.value)
    val = true;
  else if (props.type === 'categories' && props.filters.catsSelected.includes(props.message))
    val = true;

  return (
    <div className='each-filter'>
      <label className='filter-label'>{props.message}</label>
      <Switch checked={val}
        name={props.message}
        className={filterItemClass}
        onClick={props.handleClick}>{props.message}</Switch>
    </div>
  );
};
export default FilterItem;