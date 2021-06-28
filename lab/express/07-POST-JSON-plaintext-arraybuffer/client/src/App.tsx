import React, { useState } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';

// CONST
const urlBinaryTextResourceApi:string = 'data/resource_binary_text';
const urlJSONResourceApi:string = 'data/status_json'

interface Status  {
  num: number;
  msg: string;
}

async function TestPostJSON(){
  console.log('TestPostJSON');
  const url:string = urlJSONResourceApi;
  let statusMe:Status = {num: 0, msg: 'init'};

  var xhr = new XMLHttpRequest;
  xhr.open("POST", url);
  xhr.setRequestHeader('Content-Type', 'application/json');  // ok, router.use(bodyParser.json({type: 'application/json'}));
  xhr.send(JSON.stringify(statusMe));  // key
  // xhr.send(JSON.stringify({"num123":0,"msg":"init"})); // will no pass the json validator in server

  console.log('[client] sent: statusMe = ' + JSON.stringify(statusMe));
  xhrEventHandle(xhr);
}


async function TestPostArrayBuffer(){
  console.log('TestPostArrayBuffer');
  const url:string = urlBinaryTextResourceApi;
  var myArray = new ArrayBuffer(512);
  var longInt8View = new Uint8Array(myArray);

  // generate some data
  for (var i=0; i< longInt8View.length; i++) {
    longInt8View[i] = i % 256;
  }

  var xhr = new XMLHttpRequest;
  xhr.open("POST", url)//, true);
  xhr.setRequestHeader('Content-Type', 'application/octet-stream'); 
  xhr.send(myArray);

  console.log('[client] sent: myArray = ' + myArray);

  // -- Server received headers (no content type) --
  // header = {"host":"localhost:9000","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0","accept":"*/*","accept-language":"en-US,en;q=0.5","accept-encoding":"gzip, deflate",
  //          "content-type":"application/octet-stream","content-length":"512","origin":"http://localhost:9000","connection":"keep-alive","referer":"http://localhost:9000/","dnt":"1","sec-gpc":"1"}
  xhrEventHandle(xhr);
}

async function TestPostBlob(){
  const url:string = urlBinaryTextResourceApi;
  let xhr = new XMLHttpRequest();
  xhr.open('Post', url);
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
  const onTestPostJSON = TestPostJSON;

  return (
    <div className="App">
      <header className="App-header">
        <p><Button onClick={onTestPostBlob} variant="contained" color="primary"> 1. Test: Post Blob, type: 'text/plain' </Button></p>
        <p><Button onClick={onTestPostArrayBuffer} variant="contained" color="primary">2.  Test: Post ArrayBuffer, type = 'application/octet-stream' </Button></p>
        <p><Button onClick={onTestPostJSON} variant="contained" color="primary">3. Test: Post JSON, type: 'application/json; utf-8'  </Button></p>
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
