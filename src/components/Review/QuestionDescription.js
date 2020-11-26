import React from 'react';
import { makeStyles } from '@material-ui/core/styles';import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0px',
    marginLeft: '0px',
    paddingLeft: '0px'
  },
  descriptionName: {
    marginTop: '0px',
    marginBottom: '8px',
  }
}));

const QuestionDescription = props => {
  const classes = useStyles();
  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent" className={classes.box}>
        <p id="transition-modal-description" className={classes.descriptionName}>{ props.description }</p>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            defaultValue={props.reviewDescription}
            fullWidth
            onChange={(event) => props.onChange(props.title, event.target.value)}
            inputProps={{ maxLength: 150 }}
            variant="outlined"
          />
      </Box>
    </div>
  )
};

export default QuestionDescription;