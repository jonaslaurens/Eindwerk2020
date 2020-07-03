import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';

import { getData, selectId } from './components/Table/slice';
import { selectLoginState } from './components/Login/slice';

// components
import LoginPage from './components/Login';

const App = () => {
  const dispatch = useDispatch();
  const tableId = useSelector(selectId);
  const isLoggedIn = useSelector(selectLoginState);

  setInterval(() => {
    if (tableId) {
      dispatch(getData(tableId));
    }
  }, 2000);

  return (
    <div className="App">
      <LoginPage />
      {/* {!isLoggedIn ? <LoginPage /> : <h1>{message.msg}</h1>} */}
    </div>
  );
};

export default App;
