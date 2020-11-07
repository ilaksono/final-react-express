import 'styles/App.css';
import useApplicationData from 'hooks/useApplicationData';
import LoginForm from 'components/LoginForm';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from 'components/NavBar';
import Home from 'components/Home';

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
        </Switch>
      </Router>
    </div >
  );
}

export default App;
