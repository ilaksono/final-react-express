import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
const ChartTab = (props) => {

  const classes = useStyles();
  const arr = ['priceLeft', 'price', 'price', 'priceRight'];

  const buttons = props.chartSelect.options
    .map((select, index) => {
      return (
        <div key={index} >
          <Button
            color={select === props.chartSelect.select 
              ? 'primary' : 'default'}
            variant='contained'
            className={classes[arr[index]]}
            key={index}
            name={select}
            onClick={() => 
            props.clickChartTab(select)}>
              {select}
              </Button>
        </div>
      );
    });

  return (
    <div className='price-filter-container'>
      {buttons}
    </div>
  );


};

export default ChartTab;