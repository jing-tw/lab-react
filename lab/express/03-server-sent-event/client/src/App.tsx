import React, { useState } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import MyImage from './component/my-image';

function App() {
  // Create the Ref to your component
  let myimage = React.createRef<MyImage>();
  
  const onStartSentEventFromServer = async () => {
    console.log('onStartSentEventFromServer')
    // const url = 'http://192.168.1.100:9000/statusAPI';  // ok
    const url = 'statusAPI'; // ok 
    //const evtSource = new EventSource(url, { withCredentials: true } ); // ok
    const evtSource = new EventSource(url); // ok
    evtSource.onmessage = function(event) {
      const strNum:string = JSON.parse(event.data).num;
      let num:number = parseInt(strNum);
      console.log('num = ' + num);
      (myimage.current as MyImage).changeLight(num%2);

      /* By default, if the connection between the client and server closes, the connection is restarted. The connection is terminated with the .close() method.
      ref. https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
      */
      if (num == 5){
        console.log('[Early Stop] entSource.close')
        evtSource.close();
      }
    }
    // intLightId = (intLightId + 1) % 2;
    // (myimage.current as MyImage).changeLight(intLightId);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <MyImage ref = {myimage} /> 
          <Button onClick={onStartSentEventFromServer} variant="contained" color="primary"> Start to received event from Server </Button>
        </p>
      </header>
    </div>
  );
}

export default App;
