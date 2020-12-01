import React, { useState, useContext } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import QuestionRating from 'components/Review/QuestionRating/';
import QuestionDescription from 'components/Review/QuestionDescription/';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { YelpContext } from 'YelpContext.js';
import useProfileData from '../../hooks/useProfileData';


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
    outline: 0,
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


  const [cleanliness, setCleanliness] = useState(props.cleanliness || INIT_RATING);
  const [socialDistancing, setSocialDistancing] = useState(props.socialDistancing || INIT_RATING);
  const [transactionProcess, setTransactionProcess] = useState(props.transaction || INIT_RATING);
  const [overallComfort, setOverallComfort] = useState(props.overall_rating || INIT_RATING);
  const [description, setDescription] = useState(props.description || INIT_DESCRIPTION);
  const { businessDetails,
    appState,
    submitNewReview,
    setNewReview,
    setBusinessDetails,
    setLoadToxic
  } = useContext(YelpContext);

  // const { allUsers, setAllUsers } = useProfileData();


  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const submitEditReview = (id, user_id, venue_id, venue_name, cleanliness, socialDistancing, transactionProcess, overall_rating, description) => {
    setNewReview(true);
    if (props.isProfile && !props.isHome) {
      return axios.post("/api/reviews/edit",
        {
          id, user_id, venue_id, venue_name, cleanliness,
          socialDistancing, transactionProcess,
          description, overall_rating
        })
        .then(() => {
            props.updateFavouriteReview(venue_id, { description, 
              overall_rating,
              socialdistancing: socialDistancing,
              transactionprocess: transactionProcess,
              cleanliness,
              user_id
             });
          setLoadToxic(false);
        });
    }
    else {
      return axios
        .post("/api/reviews/edit",
          {
            id, user_id, venue_id, venue_name,
            cleanliness, socialDistancing,
            transactionProcess, description,
            overall_rating
          })
        .then(response => {
          if (response) {
            let updatedBusinessDetailsReviews = [...businessDetails.reviews];
            const findReview = updatedBusinessDetailsReviews.find(review => review.id === id);
            findReview.cleanliness = cleanliness;
            findReview.socialdistancing = socialDistancing;
            findReview.transactionprocess = transactionProcess;
            findReview.overall_rating = overall_rating;
            findReview.description = description;
            updatedBusinessDetailsReviews = updatedBusinessDetailsReviews.map(review => review.user_id === user_id ? findReview : review);

           
            setLoadToxic(false);

            return setBusinessDetails(prev => ({ ...prev, reviews: updatedBusinessDetailsReviews }));

          }
        })
        .catch(err => console.log(err));
    }
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
    setLoadToxic(true);
    handleClose();
    if (props.overall_rating) {
      submitEditReview(props.review_id, props.user_id, props.venue_id, props.venue_name, cleanliness, socialDistancing, transactionProcess, overallComfort, description, props.isProfile)
        .then(response => {
          setLoadToxic(false);
        }).catch(err => console.log(err));
    }
    else {
      props.setReviewSnackBar(true);
      submitNewReview(appState.name, props.venue_id, cleanliness, socialDistancing, transactionProcess, overallComfort, description, businessDetails.name, appState.profile_pic)
        .then(response => {
          setLoadToxic(false);
          setNewReview(true);
          if (!response) {
            return handleClose();
          }
          // props.setReviewSnackBar(true);
          resetState();
          setOpen(true);
        }).catch(err => console.log(err));
    }
  };

  const resetState = () => {
    setCleanliness(INIT_RATING);
    setSocialDistancing(INIT_RATING);
    setTransactionProcess(INIT_RATING);
    setOverallComfort(INIT_RATING);
    setDescription(INIT_DESCRIPTION);
  };

  const questions = questionData.map((question, index) => {
    if (question.title !== 'Description') {
      return <QuestionRating id={question.id} key={index} value={question.value} description={question.description} title={question.title} onChange={handleChange} />;
    } else {
      return <QuestionDescription id={question.id} key={index} description={question.description} reviewDescription={props.description} title={question.title} onChange={handleChange} />;
    }
  });

  return (

    <div>
      {props.overall_rating && (
        <div className="edit-button">
          <EditIcon onClick={handleOpen} />
        </div>
      )
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
                  onClick={() => {

                    setNewReview(true);
                    handleSubmit();
                  }}
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
    </div >
  );
};

export default NewReview;