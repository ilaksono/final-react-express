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
const libraries = ["places"];

// export const YelpContext = React.createContext();


function App() {

  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: process.env.GOOGLE_API_KEY,
  //   libraries
  // });
  // console.log(isLoaded);
  // if (loadError) return 'Error loading maps';
  // if (!isLoaded) return "loading maps";

  return (
    <div className="layout">
      <YelpProvider>
        <Router>
          <NavBar loadSearch />
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
          </Switch>
        </Router>
      </YelpProvider>
    </div>
  );
}

export default App;
