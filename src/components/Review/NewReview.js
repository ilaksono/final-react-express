import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import QuestionRating from "components/Review/QuestionRating/";
import QuestionDescription from "components/Review/QuestionDescription/";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
/* 
const initForm = {
  email: '',
  password: '',
  errMsg: ''
}; */

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid gray',
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2)
  },
  businessName: {
    marginTop: '8px',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const questionData = [
  {
    id: 1,
    title: 'Cleanliness',
    description: 'Overall cleanliness and availability of hand sanitizer:'
  },
  {
    id: 2,
    title: 'Social Distancing',
    description: 'Social distancing practices and appropriate usage of masks:'
  },
  {
    id: 3,
    title: 'Transaction',
    description: 'Smooth and safe process of paying, picking up your order, and/or being seated:'
  },
  {
    id: 4,
    title: 'Overall',
    description: 'Overall feeling of comfort and safety:'
  },
  {
    id: 5,
    title: 'Description',
    description: 'Additional information (optional):'
  }
];

const NewReview = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const questions = questionData.map(question => {
    if (question.title !== 'Description') {
      return <QuestionRating id={question.id} description={question.description} detail={question.detail} />
    } else {
      return <QuestionDescription id={question.id} description={question.description} />
    }
  });

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        react-transition-group
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>

            <Box component="fieldset" mb={3} borderColor="transparent" className={classes.box}>
              <h3 id="transition-modal-title">New Review</h3>
              <p id="transition-modal-description" className={classes.businessName}>{ props.name }</p>
              <form className={classes.root} noValidate autoComplete="off">
                { questions }
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<DeleteIcon />}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
              </form>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default NewReview;