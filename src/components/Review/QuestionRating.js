import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

const useStyles = makeStyles((theme) => ({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
    marginLeft: '0px',
    paddingLeft: '0px'
  },
  businessName: {
    marginTop: '0px',
    marginBottom: '8px',
  }
}));

const QuestionRating = props => {
  const classes = useStyles();
  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent" className={classes.box}>
        <p id="transition-modal-description" className={classes.businessName}>{ props.description }</p>
          <StyledRating
            name={props.id}
            defaultValue={2}
            getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
            precision={0.5}
            icon={<FavoriteIcon fontSize="inherit" />}
          />
      </Box>
    </div>
  )
};

export default QuestionRating;