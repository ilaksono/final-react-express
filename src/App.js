import './App.css';
import useApplicationData from 'hooks/useApplicationData';
import LoginForm from 'components/LoginForm';

function App() {
  const { logState,
    appState,
    submitHandle,
    createHandle,
    deleteHandle
  } = useApplicationData();


  return (
    <div className="App">
      <LoginForm submitHandle={submitHandle} logState={logState} />
    </div>
  );
}

export default App;
