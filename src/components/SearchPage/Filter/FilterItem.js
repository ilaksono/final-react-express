
const FilterItem = props => {
  const filterItemClass = '';
  return (
    <div>
      <label>{props.children}</label>
      <button onClick={props.handleClick}>{props.message}</button>
    </div>
  );
};
export default FilterItem;