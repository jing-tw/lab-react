import React, { useState } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import MyClassComp from './components/my-class-comp';
import MyFunComp from './components/my-fun-comp'


function App() {
  const [state, setState] = useState({ id: 0 });

  // Create the Ref to your component
  let classComp = React.createRef<MyClassComp>();

  const onChangeLight = async () => {
    console.log('onChangeLight');
    
    // setState will chain react the renders all childs
    setState({ ...state, id: state.id = (state.id + 1)%3 });

    // 
    (classComp.current as MyClassComp).changeLight(state.id);
  }

  return (
    <div className="App">
      <div> Class Component <MyClassComp ref={classComp} /> </div>
      <div> Function Component <MyFunComp id={state.id}></MyFunComp></div>
      <div><Button onClick={onChangeLight} variant="contained" color="primary"> Success</Button></div>
    </div>
  );
}

export default App;
