import React, { useContext } from 'react';
import './App.css';

// redux
// import { WSContext } from './context/provider/WSContext';

// components
import LoginPage from './components/Login';

const App = () => {
  // const { message, isLoggedIn } = useContext(WSContext);

  return (
    <div className="App">
      <LoginPage />
      {/* {!isLoggedIn ? <LoginPage /> : <h1>{message.msg}</h1>} */}
    </div>
  );
};

export default App;
