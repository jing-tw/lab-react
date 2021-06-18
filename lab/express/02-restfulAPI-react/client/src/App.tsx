import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import MyComponent from './mode';

let mode:number = 0;
function App() {
  const url = 'http://192.168.21.14:9000/statusAPI'; // cors
  const [myMap, setMyMap] = useState(new Map());
  
  // Create a ref (in constructor)
  let mycomonentElement = React.createRef<MyComponent>();
  
  const updateMap = (k:string,v:any) => {
    setMyMap(new Map(myMap.set(k,v)));
  }

  const onChangeMyComponent = async () => {
    console.log('onChangeMyComponent')
    updateTitle('btChangeMyComponentTest.Title', 'Testing');

    // (mycomonentElement.current as MyComponent).changeMyComponent(2);
    
    (mycomonentElement.current as MyComponent).changeMyComponent(mode++);

    // let response = await fetch(url);
    // if (response.ok) { // if HTTP-status is 200-299
    //   let text = await response.text();
    //   alert('response = ' + text.slice(0, 80))
    // } else {
    //   alert("HTTP-Error: " + response.status);
    // }
  }

  function updateTitle(strKeyTitle:string, strValueTitle:string):void{
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
          <MyComponent ref = {mycomonentElement} /> 
          <Button onClick={getValue(myMap, 'btChangeMyComponentTest.onClickedHandler', onChangeMyComponent)} variant="contained" color="primary"> {getValue(myMap, 'btChangeMyComponentTest.Title', 'Test')}</Button>
        </p>
      </header>
    </div>
  );
}

export default App;
