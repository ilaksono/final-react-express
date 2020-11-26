import { Link } from 'react-router-dom';
import { YelpContext } from 'YelpContext.js';
import { useContext, Fragment, useState, useEffect } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import 'styles/Home.scss';
import Search from 'components/Search';
import ReviewList from 'components/BusinessPage/ReviewList';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 400,
    width: '100%',
    maxHeight: 200
  },
  image: {
    maxHeight: 168,
    minWidth: 300,
    margin: '9px auto',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
        borderRadius: 50
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifySelf: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 2}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,

    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));


const Home = () => {

  const classes = useStyles();
  const { tops, yelpSearch, appState,
    resetFilters,
    setLoadingSearch,
    newReview,
    setNewReview
  } = useContext(YelpContext);

  const [homeReviews, setHomeReviews] = useState([]);
  useEffect(() => {
    getNewReviews()
      .then(() => {
        setNewReview(false);
      });
    // eslint-disable-next-line
  }, [newReview]);

  const homeHelpCount = (reviewID, term) => {
    let cpy = [...homeReviews];
    if (term === 'add') {
      cpy
        .forEach((review, index) => {
          if (review.id === reviewID)
            cpy[index].helpful_count += 1;
        });
    } else if (term === 'delete') {
      cpy
        .forEach((review, index) => {
          if (review.id === reviewID)
            cpy[index].helpful_count -= 1;
        });
    }
    return setHomeReviews([...cpy]);
  };

  const homeDeleteReview = (reviewID) => {
    let copiedReviews = [...homeReviews]
    copiedReviews.map(review => {
      if (review.id === reviewID) {
        const indexOfReview =homeReviews.indexOf(review)
        copiedReviews.splice(indexOfReview, 1);
        setHomeReviews( [...copiedReviews])
      }
    })
  }

  const getNewReviews = () => {
    return axios
      .get('/api/reviews/home')
      .then(res => {
        console.log(res);
        setHomeReviews([...res.data.data]);
      })
      .catch(er => console.log(er));
  };

  let parsedTopList = [];
  if (tops.show.length) {
    parsedTopList = tops.show.map((image) => {
      return (
        <ButtonBase
          focusRipple
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          onClick={() => {
            setLoadingSearch(true);
            resetFilters();
            yelpSearch(image.title, appState.center.city);

          }}
          style={{
            width: image.width,
            borderRadius: 50,
            height: 400
          }}
        >
          <Link to={'/search'}>
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
                style={{
                  fontSize: 28,
                  fontFamily: 'inherit'
                }}

              >
                {image.title}
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </Link>
        </ButtonBase>
      );
    });
  }

  return (
    <div className='home-layout'>
      <div className='search-home-container'>
        <Search
          isHome={true}
          buttonMessage={<i className="fas fa-search"></i>}
        />
      </div>
      <div className='home-widget-review-container'>
        <div className='widget-container'>
          {
            !parsedTopList.length ?
              <CircularProgress size={65} className='home-loading'/> :
              <>
                <div className='top-container'>
                  <span className='top-label'>Top Searches</span>
                </div>
                {parsedTopList}
              </>
          }
        </div>
        <div className='home-reviews-container'>
          {
            homeReviews.length ?
              <ReviewList
                reviews={homeReviews}
                profileHelpCount={homeHelpCount}
                profileDeleteReview={homeDeleteReview}
                isHome={true}
              />
              :
              <CircularProgress size={65} className='home-loading'/>
          }
        </div>


      </div>
    </div>
  );
};

export default Home;