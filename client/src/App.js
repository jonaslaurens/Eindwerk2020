import React from 'react';
import './App.css';

import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from './components/Login/slice';

import LoginPage from './components/Login';

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className="App">
      {!isLoggedIn ? <LoginPage /> : <h1>Hello there</h1>}
    </div>
  );
}

export default App;
