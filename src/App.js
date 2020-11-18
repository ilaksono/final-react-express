import useApplicationData from 'hooks/useApplicationData';
import Login from 'components/Login/Login';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from 'components/NavBar/NavBar';
import Home from 'components/Home/Home';
import Register from 'components/Register/Register';
import useMapData from 'hooks/useMapData';
import SearchPage from "components/SearchPage/SearchPage";
import { useLoadScript } from '@react-google-maps/api';
import PlacesResults from 'components/PlacesResults';
import useYelpData  from "./hooks/useYelpData"


const libraries = ["places"]

function App() {

  const { 
    appState,
    submitHandle
  } = useApplicationData();

  const {results} = useYelpData("lafleur");
  console.log("results:", results)
  const {mapState, addResults} = useMapData();
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_API_KEY,
    libraries
  })
  console.log(isLoaded);
  if(loadError) return 'Error loading maps';
  if(!isLoaded) return "loading maps";

  return (
    <div className="layout">
      <Router>
        <Switch>
            <Route exact path='/' >
              <NavBar isLoaded={isLoaded} addResults={addResults}>
                <Home />
              </NavBar>
            </Route>
            <Route path='/register' >
              <NavBar isLoaded={isLoaded} addResults={addResults} loadSearch />
              <Register />
            </Route>
            <Route path='/login'>
              <NavBar isLoaded={isLoaded} addResults={addResults} loadSearch />
              <Login submitHandle={submitHandle}/>
            </Route>
            <Route path='/search'>
              <NavBar isLoaded={isLoaded} addResults={addResults} loadSearch />
              <SearchPage mapState={mapState} addResults={addResults} />
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
