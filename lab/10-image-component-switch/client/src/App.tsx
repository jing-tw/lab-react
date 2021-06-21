import React, { useState } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import MyImage from './component/my-image';

let intLightId:number = 0;
function App() {
  // Create the Ref to your component
  let myimage = React.createRef<MyImage>();
  
  const onChangeLight = async () => {
    console.log('onChangeLight')
    intLightId = (intLightId + 1) % 2;
    (myimage.current as MyImage).changeLight(intLightId);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <MyImage ref = {myimage} /> 
          <Button onClick={onChangeLight} variant="contained" color="primary"> Success</Button>
        </p>
      </header>
    </div>
  );
}

export default App;
