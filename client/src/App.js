import React from 'react';
import './App.css';

// redux
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from './components/Login/slice';

// context
import { WSProvider } from './context/provider/WSContext';

// components
import LoginPage from './components/Login';

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <WSProvider>
      <div className="App">
        {!isLoggedIn ? <LoginPage /> : <h1>Hello there</h1>}
      </div>
    </WSProvider>
  );
}

export default App;
