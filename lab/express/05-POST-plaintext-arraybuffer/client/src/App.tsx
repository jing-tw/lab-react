import React, { useState } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';

async function TestPostArrayBuffer(){
  console.log('TestPostArrayBuffer');
  const urlBinaryResourceApi:string = 'data/binary-resource';
  var myArray = new ArrayBuffer(512);
  var longInt8View = new Uint8Array(myArray);

  // generate some data
  for (var i=0; i< longInt8View.length; i++) {
    longInt8View[i] = i % 256;
  }

  var xhr = new XMLHttpRequest;
  xhr.open("POST", urlBinaryResourceApi)//, true);
  xhr.setRequestHeader('Content-Type', 'application/octet-stream'); 
  xhr.send(myArray);

  console.log('[client] sent: myArray = ' + myArray);

  // -- Server received headers (no content type) --
  // header = {"host":"localhost:9000","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0","accept":"*/*","accept-language":"en-US,en;q=0.5","accept-encoding":"gzip, deflate",
  //          "content-type":"application/octet-stream","content-length":"512","origin":"http://localhost:9000","connection":"keep-alive","referer":"http://localhost:9000/","dnt":"1","sec-gpc":"1"}
  xhrEventHandle(xhr);
}

async function TestPostBlob(){
  const urlBinaryResourceApi:string = 'data/binary-resource';
  let xhr = new XMLHttpRequest();
  xhr.open('Post', urlBinaryResourceApi);
  var blob = new Blob(['abc123'], {type: 'text/plain'});
  xhr.send(blob);
  // -- Server received headers --
  // header = {"host":"localhost:9000","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0","accept":"*/*","accept-language":"en-US,en;q=0.5","accept-encoding":"gzip, deflate",
  //          "content-type":"text/plain","content-length":"6","origin":"http://localhost:9000","connection":"keep-alive","referer":"http://localhost:9000/","dnt":"1","sec-gpc":"1"}

  xhrEventHandle(xhr);
}



function App() {
  const onTestPostBlob = TestPostBlob;
  const onTestPostArrayBuffer = TestPostArrayBuffer;

  return (
    <div className="App">
      <header className="App-header">
        <p><Button onClick={onTestPostBlob} variant="contained" color="primary"> Test: Post Blob, type: 'text/plain' </Button></p>
        <p><Button onClick={onTestPostArrayBuffer} variant="contained" color="primary"> Test: Post ArrayBuffer </Button></p>
      </header>
    </div>
  );
}

export default App;






async function xhrEventHandle(xhr:XMLHttpRequest){
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
