const NavIcon = (props) => {

  return (
    <div className={props.select[props.type] ? 'selected-container' : 'not-selected-container'}>

    <div className={props.select[props.type] ? 'nav-selected' : 'nav-not-selected' }>
      <i style={{fontSize: '24px'}} className={props.FAClass}></i>
    </div>
    </div>
  )
}

export default NavIcon;

//"fas fa-search"