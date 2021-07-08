import React, { useState } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import MyComp from './component/my-comp';

function App() {
  const [state, setState] = useState({cnt:0, msg:'init'});
  let refChild = React.createRef<MyComp>();

   const OnClicked = async () => {
    console.log('OnClicked');
    setState({...state, cnt: state.cnt + 1, msg:'cnt = ' + state.cnt}); // update current state
    (refChild.current as MyComp).updateMe(state.cnt); // update child comp.
  }
  
  return (
    <div className="App">
      <header className="App-header">
          <div> Parent: {state.msg}</div>
          <div> <MyComp ref = {refChild} /> </div>
          <Button onClick={OnClicked} variant="contained" color="primary">Click</Button>
      </header>
    </div>
  );
}

export default App;
