import React from 'react';
import logo from './logo.svg';
import './App.css';

function NumberList(props:any):JSX.Element {
  // Step 2: 從 props 取出陣列資料: number
  const numbers = props.numbers;   
  // Step 3: 建立變數
  const listItems = numbers.map((number:Array<number>) =>    <li>{number}</li>  );  

  return (
    <ul>{listItems}</ul>  
  );

}

const numbers:Array<number> = [1, 2, 3, 4, 5, 6];

function App() {
  return (
    <div className="App">
      <NumberList numbers={numbers} />,  
      document.getElementById('root')
    </div>
  );
}

export default App;
