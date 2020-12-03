import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import 'index.scss';
import 'styles/App.scss';
import 'styles/Register.scss';
import 'styles/Button.scss';
import 'styles/Home.scss';
import 'styles/UserProfile.scss';
import 'styles/UserProfile.scss';
import 'styles/ChartSection.scss';
import 'styles/SearchPage.scss';
import "styles/PlaceListItem.scss";
import "styles/PlaceListItem.scss";
import 'styles/Results.scss';
import 'styles/Map.scss';
import 'styles/FilterItem.scss';
import 'styles/FilterBar.scss';
import 'styles/VenueAutoComplete.scss';
import 'styles/Venue.scss';
import 'styles/Location.scss';
import 'styles/Search.scss';
import 'styles/BusinessPage.scss';
import 'styles/NavBar.scss';
import 'styles/AccountMenu.scss';
import 'styles/ReviewListItem.scss';
import "styles/ReviewList.scss";
import 'styles/Photos.scss'
import 'styles/Animations.scss';


import axios from "axios";

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}


ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
