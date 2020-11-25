import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { useLoadScript } from '@react-google-maps/api';
import NavBar from 'components/NavBar';
import Home from 'components/Home'
import Register from 'components/Register';
import Login from 'components/Login';
import SearchPage from 'components/SearchPage';
import React from 'react';
import { YelpProvider } from './YelpContext';
import BusinessPage from "components/BusinessPage/index";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'styles/App.scss';
import UserProfile from 'components/UserProfile';

const libraries = ["places"];

// export const YelpContext = React.createContext();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1E0253',
    },
    secondary: {
      main: '#FF717C',
    }
  }
});

function App() {

  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: process.env.GOOGLE_API_KEY,
  //   libraries
  // });
  // console.log(isLoaded);
  // if (loadError) return 'Error loading maps';
  // if (!isLoaded) return "loading maps";

  // MOCK DATA TO TEST NEWREVIEW COMPONENT
  const id = '7hcxAsYC5R8BIcm1xQ_1_Q';
  const name = 'Birria Catrina';
  
  return (
    <div className="layout">
      <YelpProvider>
        <MuiThemeProvider theme={theme}>
          <Router>
            <NavBar loadSearch />
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
                <UserProfile />
              </Route>
            </Switch>
          </Router>
        </MuiThemeProvider>
      </YelpProvider>
    </div>
  );
}

export default App;
