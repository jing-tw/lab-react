import React, { useState } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import MyImage from './component/my-image';

function App() {
  // Create the Ref to your component
  let myimage = React.createRef<MyImage>();
  let cnt:number = 0;
  
  const onStartMonitor = async () => {
    console.log('[client] onStartMonitor')
    const url = 'status-realtime/start-monitor'; 
    const evtSource = new EventSource(url);

    // On status changed from server
    evtSource.onmessage = function(event) {
      const strNum:string = JSON.parse(event.data).num;
      let num:number = parseInt(strNum);
      console.log('[client] onmessage num = ' + num);
      (myimage.current as MyImage).changeLight(num%3);

      if (num == 20){
        console.log('[client] Early Stop, entSource.close')
        evtSource.close();
      }
    }
  }

  const onUpdate = async () => {
    cnt++;
    console.log('[client] onUpdate, ' + cnt);
    const url = 'status-realtime/increase';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.onload = function() {
      if (xhr.status != 200) { // HTTP error?
        console.log('[client] Error: xhr.status != 200' + xhr.status)
        return;
      }
      // get the response from xhr.response
      console.log('[client] xhr.response = ' + xhr.response);
    };
    xhr.onprogress = function(event) {
      var percentComplete = event.loaded / event.total * 100;
      console.log(`[client] xhr progress ${percentComplete}% complete.`);
    };

    xhr.onerror = function() {
      console.log('[client] handle non-HTTP error (e.g. network down)');
    };


  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <MyImage ref = {myimage} /> 
          <Button onClick={onStartMonitor} variant="contained" color="primary"> Start Monitor </Button>
          <Button onClick={onUpdate} variant="contained" color="secondary"> Update Status </Button>
        </p>
      </header>
    </div>
  );
}

export default App;
