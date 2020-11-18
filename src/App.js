import 'styles/App.scss';
import useApplicationData from 'hooks/useApplicationData';
import LoginForm from 'components/LoginForm';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from 'components/NavBar';
import Home from 'components/Home';
import RegisterForm from 'components/RegisterForm';
import useMapData from 'hooks/useMapData';
import Search from 'components/Search';
import { useLoadScript } from '@react-google-maps/api';
import PlacesResults from 'components/PlacesResults';

const libraries = ["places"]

function App() {

  const { 
    appState,
    submitHandle
  } = useApplicationData();
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
        <NavBar />
        <Switch>
          <Route exact path='/' >
            <Home />
          </Route>
          <Route path='/register' >
            <RegisterForm />
          </Route>
          <Route path='/login'>
            <LoginForm submitHandle={submitHandle}/>
          </Route>
          <Route path='/search'>
            <Search isLoaded={isLoaded} addResults={addResults}/>
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
