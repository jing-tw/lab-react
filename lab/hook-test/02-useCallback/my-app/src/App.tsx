import React, {useState} from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import User from './componts/user'

function App() {
  const [state, setState] = useState('Click');

  const onClickHandler = () => {
    setState('loading');
    setTimeout(() => {
        setState('success');
    }, 2000);
  }

  return (
    <div className="App">
      <User userId="1"></User>
      <Button onClick={onClickHandler} variant="contained" color="primary">
        {state}
      </Button>

    </div>
  );
}

export default App;
