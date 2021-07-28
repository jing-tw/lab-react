import React from 'react';
import './App.css';

import LoginButton from './features/LoginButton/LoginButton';
import LogoutButton from './features/LogoutButton/LogoutButton';

function App() {
  return (
    <div className="App">
      <LoginButton />
      <LogoutButton />
    </div>
  );
}

export default App;
