import Switch from '@material-ui/core/Switch';
const TogglePerDay = (props) => {

  return (
    <div className='each-filter'>
      <label className='filter-label'> </label>
      <div className='per-day-label'>
        <Switch
          checked={props.chartSelect.perDay}
          color={props.chartSelect.perDay ? 'primary' : 'default'}
          size='small'
          name={props.message}
          onClick={props.changePerDay}>
        </Switch>
        {props.message}</div>
    </div>
  );

};
export default TogglePerDay;