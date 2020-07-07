import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';

import { selectLoginState } from './components/Login/slice';

// components
import Login from './components/Login/Login';
import Table from './components/Table/Table';

const App = () => {
  const isLoggedIn = useSelector(selectLoginState);

  return (
    <div className="App">
      {/* <Table /> */}
      {!isLoggedIn ? <Login /> : <Table />}
    </div>
  );
};

export default App;
