import React,  { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import { createCallChain } from 'typescript';



function App() {
  const url = 'http://localhost:9000/statusAPI';
  const [myMap, setMyMap] = useState(new Map());
  const updateMap = (k:string,v:any) => {
    setMyMap(new Map(myMap.set(k,v)));
  }


  const onClickedTestNeedle = () => {
    initStatus('btTestNeedle.Title', 'btTestNeedle testing');

    var needle = require('needle');
    needle.get(url, function(error:any, response:any) {
    if (!error && response.statusCode == 200)
      alert(response.body);
    });
  }

  const onClickedTestFetch = async () => {
    console.log('onClickedTestFetch')
    initStatus('btTestFetch.Title', 'btTestFetch testing');

    let response = await fetch(url);
    if (response.ok) { // if HTTP-status is 200-299
      let text = await response.text();
      alert('response = ' + text.slice(0, 80))
    } else {
      alert("HTTP-Error: " + response.status);
    }
  }

  function initStatus(strKeyTitle:string, strValueTitle:string):void{
    updateMap(strKeyTitle, strValueTitle);
    setTimeout(() => {
        updateMap(strKeyTitle, 'Success');
    }, 2000);
  }

  function getValue(map:any, key:string, strDefult:any) {
    return map.get(key) || strDefult;
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
        <Button onClick={getValue(myMap, 'btTestNeedle.onClickedHandler', onClickedTestNeedle)} variant="contained" color="primary"> {getValue(myMap, 'btTestNeedle.Title', 'Test Needle')}</Button>
        <Button onClick={getValue(myMap, 'btTestFetch.onClickedHandler', onClickedTestFetch)} variant="contained" color="primary"> {getValue(myMap, 'btTestFetch.Title', 'Test Fetch')}</Button>
        </p>
      </header>
    </div>
  );
}

export default App;
