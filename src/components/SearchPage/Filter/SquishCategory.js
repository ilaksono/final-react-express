import FilterItem from './FilterItem.js';


const SquishCategory = (props) => {

  let parsedCategories = [];
  let max = props.filters.categories.length > 3
    ? 3 : props.filters.categories.length;
  for (let i = 0; i < max; i++) {
    const cat = props.filters.categories[i];
    parsedCategories.push(
      <FilterItem
        filters={props.filters}
        message={cat}
        type='categories'
        handleClick={event =>
          props.handleClick({
            type: 'categories'
            , value: event.target.getAttribute('name')
          })}
        key={i}
      />
    );
  }

  return (
    parsedCategories
  );

};

export default SquishCategory;