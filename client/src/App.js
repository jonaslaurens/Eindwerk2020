import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';

import { selectLoginState } from './components/Login/loginSlice';

// components
import Login from './components/Login/Login';
import Table from './components/Table/Table';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// TODO: remove the table component comment

const App = () => {
  const isLoggedIn = useSelector(selectLoginState);

  return (
    <div className="App">
      {/* <Table /> */}
      {!isLoggedIn ? <Login /> : <Table />}
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
