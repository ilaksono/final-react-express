import 'styles/FilterItem.scss';
const classNames = require('classnames');

const FilterItem = props => {
  const filterItemClass = classNames
    ('filter-btn', {
      'price-selected-true': props.filters.price.includes(props.message)
      ,
      'distance-selected-true': props.filters.distance === props.value
    });
  console.log(filterItemClass);
  return (
    <div>
      <label>{props.children}</label>
      <button className={filterItemClass} onClick={props.handleClick}>{props.message}</button>
    </div>
  );
};
export default FilterItem;