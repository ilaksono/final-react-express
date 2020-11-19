import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useLoadScript } from '@react-google-maps/api';
import NavBar from 'components/NavBar';
import Home from 'components/Home';
import Register from 'components/Register';
import useMapData from 'hooks/useMapData';
import SearchPage from "components/SearchPage/SearchPage";
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

  const { results, setResults } = useYelpData();
  const { refinedResults,
    setRefinedSeed,
    applyPriceFilter,
    applyAllFilters,
    applyDistanceFilter } = useRefinedData();
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
        <Switch>
          <Route exact path='/' >
            <NavBar setResults={setResults} setRefinedSeed={setRefinedSeed} isLoaded={isLoaded} addResults={addResults}>
              <Home />
            </NavBar >
          </Route>
          <Route path='/register' >
            <NavBar isLoaded={isLoaded} addResults={addResults} loadSearch />
            <Register />
          </Route>
          <Route path='/login'>
            <NavBar isLoaded={isLoaded} addResults={addResults} loadSearch />
            <Login submitHandle={submitHandle} />
          </Route>
          <Route path='/search'>
            <NavBar isLoaded={isLoaded} addResults={addResults} loadSearch />
            <SearchPage applyPriceFilter={applyPriceFilter}
              applyDistanceFilter={applyDistanceFilter}
              mapState={mapState}
              addResults={addResults}
              applyAllFilters={applyAllFilters}
              refinedResults={refinedResults}
              setRefinedSeed={setRefinedSeed}
              results={results}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
