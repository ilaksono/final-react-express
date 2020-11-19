import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useLoadScript } from '@react-google-maps/api';
import NavBar from 'components/NavBar';
import Home from 'components/Home';
import Register from 'components/Register';
import useMapData from 'hooks/useMapData';
import SearchPage from "components/SearchPage";
import useYelpData from "./hooks/useYelpData";
import useRefinedData from 'hooks/useRefinedData';
import useApplicationData from 'hooks/useApplicationData';
import Login from 'components/Login';

const libraries = ["places"];

function App() {

  const {
    appState,
    submitHandle
  } = useApplicationData();

  const { results, setResults, yelpSearch } = useYelpData();
  const { refinedResults,
    setRefinedSeed,
    applyPriceFilter,
    applyDistanceFilter } = useRefinedData();
  console.log("results:", results)
  const {mapState, addResults} = useMapData();
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_API_KEY,
    libraries
  });
  console.log(isLoaded);
  if (loadError) return 'Error loading maps';
  if (!isLoaded) return "loading maps";

  return (
    <div className="layout">
      <Router>
      <NavBar yelpSearch={yelpSearch} setRefinedSeed={setRefinedSeed} isLoaded={isLoaded} addResults={addResults} loadSearch results={results} />
        <Switch>
          <Route exact path='/' >
              <Home />
          </Route>
          <Route path='/register' >
            <Register />
          </Route>
          <Route path='/login'>
            <Login submitHandle={submitHandle} />
          </Route>
          <Route path='/search'>
            <SearchPage applyPriceFilter={applyPriceFilter}
              applyDistanceFilter={applyDistanceFilter}
              mapState={mapState}
              addResults={addResults}
              refinedResults={refinedResults}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
