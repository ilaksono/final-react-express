import 'styles/App.scss';
import useApplicationData from 'hooks/useApplicationData';
import LoginForm from 'components/LoginForm';
import GoogleSuggest from 'components/GoogleSuggest'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from 'components/NavBar';
import Home from 'components/Home';
import Map from 'components/Map';
function App() {
  const { logState,
    appState,
    submitHandle,
    createHandle,
    deleteHandle
  } = useApplicationData();


  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/' >
            <Home />
          </Route>
          <Route path='/login'>
            <LoginForm submitHandle={submitHandle} logState={logState} />
          </Route>
          <Route path='/search'>
            <GoogleSuggest />
          </Route>
          <Route path='/map'>
            <Map />
          </Route>
        </Switch>
      </Router>
    </div >
  );
}

export default App;
