import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';

import { getData, selectId } from './components/Table/slice';
import { selectLoginState } from './components/Login/slice';

// components
import LoginPage from './components/Login';
import Table from './components/Table';

const App = () => {
  const dispatch = useDispatch();
  const tableId = useSelector(selectId);
  const isLoggedIn = useSelector(selectLoginState);

  useEffect(() => {
    setInterval(() => {
      if (tableId) {
        dispatch(getData(tableId));
      }
    }, 2000);
  }, [tableId]);

  return (
    <div className="App">
      {/* <Table /> */}
      {!isLoggedIn ? <LoginPage /> : <Table />}
    </div>
  );
};

export default App;
