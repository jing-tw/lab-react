import React, { useState } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import MyImage from './component/my-image';

function getParamUrl<T>(para:T):string{
  var url = '?';
  let bFirst = false;

  for (var key in para) {
      if ((para as Object).hasOwnProperty(key)) {
          url += (bFirst ? '&' : '') + key + "=" + para[key as keyof T];
      }
      bFirst = true;
  }

  return url;
}


function App() {
  const urlStartMontorApi:string = 'status/start-monitor';
  const urlIncreaseApi:string = 'status/increase';
  const urlUpdateApi:string = 'status/update';
  interface Status {
    num: number;
    msg: string;
  }

  // Create the Ref to your component
  let myimage = React.createRef<MyImage>();
  let mystatus:Status = {num: 0, msg: 'init'};
  
  const onStartMonitor = async () => {
    console.log('[client] onStartMonitor')
    const evtSource =new EventSource(urlStartMontorApi)

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

  const onIncreaseNum = async () => {
    mystatus.num++;
    console.log('[client] onIncreaseNum, ' + JSON.stringify(mystatus));

    let xhr = new XMLHttpRequest();
    xhr.open('GET', urlIncreaseApi);
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

  const onUpdate = async () => {
    mystatus.num++;
    mystatus.msg = 'from client/onUpdate. (`${mystatus.num}`)';
    console.log('[client] onUpdate, ' + JSON.stringify(mystatus));

    let url = urlUpdateApi + getParamUrl(mystatus);

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
          {/* <Button onClick={onIncreaseNum} variant="contained" color="secondary"> [GET] Increase </Button> */}
          <Button onClick={onUpdate} variant="contained" color="secondary"> [GET] Update </Button>
        </p>
      </header>
    </div>
  );
}

export default App;
