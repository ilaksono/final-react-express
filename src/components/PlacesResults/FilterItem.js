const FilterItem = props => {

  return (
    <div>
      <label>{props.children}</label>
      <button type='button' onChange={props.setFilters}></button>
    </div>
  )
}
export default FilterItem;