import React, { useState } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import MyFunComp from './components/my-fun-comp'
import ShowWave from './components/showWave'


function App() {
  const [state, setState] = useState({ id: 0 });
  const [state2, setState2] = useState({ labName: 1 });

  const OnStartTest = async () => {
    console.log('OnStartTest');
    
    // setState will chain react the renders all childs
    setState({ ...state, id: state.id = (state.id + 1)%3 });
    setState2({ ...state2, labName: state.id });
  }

  return (
    <div className="App">
      <div> Show Wave <ShowWave labName={state2.labName}></ShowWave></div>
      <div> Function Component <MyFunComp id={state.id}></MyFunComp></div>
      <div><Button onClick={OnStartTest} variant="contained" color="primary"> Start Test</Button></div>
    </div>
  );
}

export default App;
