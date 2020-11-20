import 'styles/FilterItem.scss';
const classNames = require('classnames');

const FilterItem = props => {
  const filterItemClass = classNames
    ('filter-btn', {
      'price-selected-true': props.filters.price.includes(props.message)
      ,
      'distance-selected-true': props.filters.distance === props.value,
      'category-selected-true': props.filters.categories.includes(props.message)
    });
  return (
    <div>
      <label>{props.children}</label>
      <button name={props.message} className={filterItemClass} onClick={props.handleClick}>{props.message}</button>
    </div>
  );
};
export default FilterItem;