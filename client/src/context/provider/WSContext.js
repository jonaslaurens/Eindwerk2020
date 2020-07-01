import React, { useState, useEffect, createContext } from 'react';
import io from 'socket.io-client';
import { BASE_URL } from '../../helpers/baseUrl';

const socket = io(BASE_URL);

export const WSContext = createContext();

export const WSProvider = (props) => {
  const [message, setMessage] = useState({});
  const [errors, setErrors] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    socket.on('message', (payload) => {
      setMessage(payload);
    });

    socket.on('casino.error', (payload) => {
      setErrors(payload);
    });
  }, [errors]);

  const emitEvent = async (eventName, payload) => {
    await socket.emit(eventName, payload, (confirmation) => {
      setMessage(confirmation);

      if (confirmation.status && confirmation.type === 'login') {
        setIsLoggedIn(!isLoggedIn);
      }
    });
  };

  return (
    <WSContext.Provider
      value={{
        message,
        emitEvent,
        errors,
        isLoggedIn,
      }}
    >
      {props.children}
    </WSContext.Provider>
  );
};
