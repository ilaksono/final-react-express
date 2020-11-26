import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import QuestionRating from 'components/Review/QuestionRating/';
import QuestionDescription from 'components/Review/QuestionDescription/';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { YelpContext } from 'YelpContext.js';
import 'styles/BusinessPage.scss';


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
    padding: theme.spacing(2, 2, 2),
    paddingBottom: '0px',
    marginBottom: '0px',
  },
  businessName: {
    marginTop: '8px',
  },
  button: {
    margin: theme.spacing(1),
    marginBottom: '0px',
  },
  saveButton: {
    margin: theme.spacing(1),
    marginBottom: '0px',
    color: '#1E0253',
    fontWeight: 'bold',
    backgroundColor: '#FF717C',
    '&:hover': {
      color: 'white',
      backgroundColor: '#FF717C',
    }
  },
  new_review: {
    fontWeight: 'bold',
    color: '#1E0253',
    backgroundColor: '#FF717C',
    '&:hover': {
      backgroundColor: '#FF717C',
      color: 'white',
    },
  },
}));

const INIT_RATING = 3;
const INIT_DESCRIPTION = "";



const NewReview = props => {

  const questionData = [
    {
      id: 1,
      title: 'Cleanliness',
      description: 'Cleanliness and availability of hand sanitizer:',
      value: props.cleanliness || INIT_RATING
    },
    {
      id: 2,
      title: 'Social Distancing',
      description: 'Appropriate social distancing and mask wearing:',
      value: props.socialDistancing || INIT_RATING
    },
    {
      id: 3,
      title: 'Transaction Process',
      description: 'Safe payment, seating, and/or pickup process:',
      value: props.transaction || INIT_RATING
    },
    {
      id: 4,
      title: 'Overall Comfort',
      description: 'Overall feeling of comfort and safety:',
      value: props.overall_rating || INIT_RATING
    },
    {
      id: 5,
      title: 'Description',
      description: 'Additional information (optional):'
    }
  ];
  
  console.log("review --->", props)
  const [cleanliness, setCleanliness] = useState(INIT_RATING);
  const [socialDistancing, setSocialDistancing] = useState(INIT_RATING);
  const [transactionProcess, setTransactionProcess] = useState(INIT_RATING);
  const [overallComfort, setOverallComfort] = useState(INIT_RATING);
  const [description, setDescription] = useState(INIT_DESCRIPTION);
  const { businessDetails,
    setBusinessDetails,
    appState,
    submitNewReview,
    setNewReview,
    submitEditReview
  } = useContext(YelpContext);

  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (title, value) => {
    if (title === 'Cleanliness') {
      if (cleanliness === value) {
        setCleanliness(0);
      } else {
        setCleanliness(value);
      }
    } else if (title === 'Social Distancing') {
      if (socialDistancing === value) {
        setSocialDistancing(0);
      } else {
        setSocialDistancing(value);
      }
    } else if (title === 'Transaction Process') {
      if (transactionProcess === value) {
        setTransactionProcess(0);
      } else {
        setTransactionProcess(value);
      }
    } else if (title === 'Overall Comfort') {
      if (overallComfort === value) {
        setOverallComfort(0);
      } else {
        setOverallComfort(value);
      }
    } else if (title === 'Description') {
      setDescription(value);
    }
  };

  const handleSubmit = () => {
    if (props.overall_rating) {
      submitEditReview(props.review_id, props.user_id, props.venue_id, props.venue_name, cleanliness, socialDistancing, transactionProcess, overallComfort, description)
      .then(response => {
        console.log("getting response", response);
        setNewReview(true);
        if (!response) {
          console.log("is there a response?")
          return handleClose();
        }
        console.log('trying to set to true...');
        props.setReviewSnackBar(true);
        handleClose();
        resetState();
      }).catch(err => console.log(err));
    } else {
    submitNewReview(appState.name, props.venue_id, cleanliness, socialDistancing, transactionProcess, overallComfort, description, businessDetails.name)
      .then(response => {
        setNewReview(true);
        if (!response) {
          return handleClose();
        }
        handleClose();
        resetState();
        props.setOpen(true);
      }).catch(err => console.log(err));
    }
  };

  const resetState = () => {
    setCleanliness(props.cleanliness || INIT_RATING);
    setSocialDistancing(props.socialDistancing || INIT_RATING);
    setTransactionProcess(props.transactionProcess || INIT_RATING);
    setOverallComfort(props.overall_rating || INIT_RATING);
    setDescription(props.description || INIT_DESCRIPTION);
  };

  const questions = questionData.map(question => {
    if (question.title !== 'Description') {
      return <QuestionRating id={question.id}  value={question.value} description={question.description} title={question.title} onChange={handleChange} />;
    } else {
      return <QuestionDescription id={question.id} description={question.description} reviewDescription={props.description} title={question.title} onChange={handleChange} />;
    }
  });

  return (
    <div>
      {props.overall_rating &&
      <i
      onClick={handleOpen}
      class="fas fa-edit"></i>
      }
      {!props.overall_rating && <Button
        variant="contained"
        className={classes.new_review}
        onClick={handleOpen}
      >
        Write A Review
      </Button>}
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
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

            <Box component='fieldset' mb={3} borderColor='transparent' className={classes.box}>
              <h3 id='transition-modal-title'>New Review</h3>
              <p id='transition-modal-description' className={classes.businessName}>{props.name}</p>
              <form className={classes.root} noValidate autoComplete='off'>
                {questions}
                <Button
                  variant='contained'
                  size='large'
                  onClick={handleSubmit}
                  className={classes.saveButton}
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
                <Button
                  variant='contained'
                  className={classes.button}
                  startIcon={<DeleteIcon />}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </form>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default NewReview;