import 'styles/App.scss';
import useApplicationData from 'hooks/useApplicationData';
import LoginForm from 'components/LoginForm';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from 'components/NavBar/NavBar';
import Home from 'components/Home';
import Map from 'components/Map';
import RegisterForm from 'components/RegisterForm';
import useMapData from 'hooks/useMapData';
import VenueSearch from 'components/Search/VenueSearch';
import LocationSearch from 'components/Search/LocationSearch';
import { useLoadScript } from '@react-google-maps/api';


const libraries = ["places"]

function App() {
  const { logState,
    appState,
    submitHandle,
    createHandle,
    deleteHandle
  } = useApplicationData();
  const {mapState, addResults} = useMapData();
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
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
            <RegisterForm />
          </Route>
          <Route path='/login'>
            <LoginForm submitHandle={submitHandle} logState={logState} />
          </Route>
 {/*          <Route path='/search'>
            <Search isLoaded={isLoaded} addResults={addResults}/>
          </Route> */}
          <Route path='/maps'>
            <Map isLoaded={isLoaded} mapState={mapState}/>
          </Route>
        </Switch>
      </Router>
    </div >
  );
}

export default App;
