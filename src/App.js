import 'styles/App.scss';
import useApplicationData from 'hooks/useApplicationData';
import Login from 'components/Login/Login';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from 'components/NavBar/NavBar';
import Home from 'components/Home';
import Register from 'components/Register/Register';
import useMapData from 'hooks/useMapData';
import VenueSearch from 'components/Search/VenueSearch';
import LocationSearch from 'components/Search/LocationSearch';
import { useLoadScript } from '@react-google-maps/api';
<<<<<<< HEAD
import PlacesResults from 'components/PlacesResults';
=======
import useYelpData  from "./hooks/useYelpData"

>>>>>>> feature/front-end-yelp-api

const libraries = ["places"]

function App() {

  const { 
    appState,
    submitHandle
  } = useApplicationData();

  const {results} = useYelpData();
  const {mapState, addResults} = useMapData();
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_API_KEY,
    libraries
  })
  console.log(isLoaded);
  if(loadError) return 'Error loading maps';
  if(!isLoaded) return "loading maps";

  return (
    <div className="App">
      <Router>
        <NavBar isLoaded={isLoaded} addResults={addResults} />
        <Switch>
          <Route exact path='/' >
            <Home />
          </Route>
          <Route path='/register' >
            <Register />
          </Route>
          <Route path='/login'>
            <Login submitHandle={submitHandle}/>
          </Route>
          <Route path='/search'>
            {/* <Search isLoaded={isLoaded} addResults={addResults}/> */}
          </Route>
          <Route path='/results'>
            <PlacesResults isLoaded={isLoaded} mapState={mapState} addResults={addResults} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
