import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 180,
  },
  container: {
    display: 'flex',
    width: "100%",
    justifyContext: 'center',
    alignItems:'center',
    left: '45%'
  },
  paper: {
    margin: theme.spacing(1),
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
  fav: {
    fontSize: '250px',
    opacity: '0.7'

  }
}));

export default function SimpleGrow(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}
    style={{
      position: 'fixed',
      top: '35%',
      left: '43%',
      zIndex: props.busAnim.favGrow ? '15' : '-1'
    }}
    >
      {/* <FormControlLabel
        control={<Switch checked={props.busAnim.favGrow} onChange={handleChange} />}
        label="Show"
      /> */}
      <div className={classes.container}>
        {/* <Grow in={checked}>
          <FavoriteIcon elevation={4} className={classes.fav}>
            <svg className={classes.svg}>
              <polygon points="0,100 50,00, 100,100" className={classes.polygon} />
            </svg>
          </FavoriteIcon>
        </Grow> */}
        {/* Conditionally applies the timeout prop to change the entry speed. */}
        <Grow
          in={props.busAnim.favGrow}
          // style={{ transformOrigin: '0 0 0' }}
          {...(props.busAnim.favGrow ? { timeout: 300 } : {})}
        >
          <FavoriteIcon elevation={4} style={{
            color: props.color,
          }} className={classes.fav}>
            <svg className={classes.svg}>
              <polygon points="0,100 50,00, 100,100" className={classes.polygon} />
            </svg>
          </FavoriteIcon>
        </Grow>
      </div>
    </div>
  );
}