import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { useLoadScript } from '@react-google-maps/api';
import NavBar from 'components/NavBar';
import Home from 'components/Home';
import Register from 'components/Register';
import Login from 'components/Login';
import SearchPage from 'components/SearchPage';
import React, {useContext} from 'react';
import BusinessPage from "components/BusinessPage/index";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'styles/App.scss';
import UserProfile from 'components/UserProfile';
import useNewUser from 'hooks/useNewUser';
// export const YelpContext = React.createContext();
import CircularProgress from '@material-ui/core/CircularProgress';

import {YelpContext} from 'YelpContext';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1E0253',
    },
    secondary: {
      main: '#FF717C',
    },
    tertiary: {
      main: '#7338D2',
    }
  }
});

function App() {
  const {loadToxic} = useContext(YelpContext);
  const {
    newRegister, setNewRegister
  } = useNewUser();
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: process.env.GOOGLE_API_KEY,
  //   libraries
  // });
  // console.log(isLoaded);
  // if (loadError) return 'Error loading maps';
  // if (!isLoaded) return "loading maps";


  return (
    <div className="layout">
      
        <MuiThemeProvider theme={theme}>
        {loadToxic &&
          <CircularProgress
            className='load-toxicity'
            color='primary'
            size={60} />
        }
          <Router>
            <NavBar loadSearch setNewRegister={setNewRegister} />
            <div className='spacer'>
            </div>
            <Switch>
              <Route exact path='/' >
                <Home />
              </Route>
              <Route path='/register' >
                <Register />
              </Route>
              <Route path='/login'>
                <Login />
              </Route>
              <Route exact path='/search'>
                <SearchPage />
              </Route>
              <Route path='/search/:id'>
                <BusinessPage />
              </Route>
              <Route path='/users/:id'>
                <UserProfile
                  newRegister={newRegister}
                  setNewRegister={setNewRegister}
                />
              </Route>
            </Switch>
          </Router>
        </MuiThemeProvider>
    </div>
  );
}

export default App;
