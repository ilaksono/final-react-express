import { Link } from 'react-router-dom';
import { YelpContext } from 'YelpContext.js';
import { useContext, Fragment } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import 'styles/Home.scss';
import Search from 'components/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 200,
    margin: '20px auto',
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      boxShadow: "20px 20px 20px #9E9E9E",
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
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifySelf:'center',
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
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
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
    resetFilters
  } = useContext(YelpContext);

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
              resetFilters();
              yelpSearch(image.title, appState.center.city);
            }}
            style={{
              width: image.width,
              borderRadius: 50
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
          buttonMessage={<i class="fas fa-search"></i>}
        />
      </div>
      <div className='top-container'>
        <span className='top-label'>Top Searches</span>
      </div>
      <div className='widget-container'>

        {parsedTopList}
      </div>
    </div>
  );
};

export default Home;