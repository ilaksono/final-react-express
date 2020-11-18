import 'styles/App.scss';
import useApplicationData from 'hooks/useApplicationData';
import Login from 'components/Login/Login';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from 'components/NavBar/NavBar';
import Home from 'components/Home';
import Register from 'components/Register/Register';
import useMapData from 'hooks/useMapData';
import Search from 'components/Search/Search';
import { useLoadScript } from '@react-google-maps/api';
import PlacesResults from 'components/PlacesResults';
import useYelpData  from "./hooks/useYelpData"


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
        <Switch>
            <Route exact path='/' >
              <NavBar isLoaded={isLoaded} addResults={addResults}>
                <Home />
              </NavBar>
            </Route>
          <NavBar isLoaded={isLoaded} addResults={addResults} loadSearch >
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
              <PlacesResults  mapState={mapState} addResults={addResults} />
            </Route>
          </NavBar>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
