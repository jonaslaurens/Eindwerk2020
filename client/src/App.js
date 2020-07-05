import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';

import { selectLoginState } from './components/Login/slice';

// components
import LoginPage from './components/Login';
import Table from './components/Table';

const App = () => {
  const isLoggedIn = useSelector(selectLoginState);

  return (
    <div className="App">
      {/* <Table /> */}
      {!isLoggedIn ? <LoginPage /> : <Table />}
    </div>
  );
};

export default App;
