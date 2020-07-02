import React, { useState, useEffect, createContext } from 'react';
import io from 'socket.io-client';
import { BASE_URL } from '../../helpers/baseUrl';

import { useDispatch } from 'react-redux';
import { addTable, addPlayer } from '../../components/Table/slice';

// init socket
const socket = io(BASE_URL);

// init context
export const WSContext = createContext();

// socket provider
export const WSProvider = (props) => {
  const [message, setMessage] = useState({});
  const [errors, setErrors] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('message', (payload) => {
      setMessage(payload);
    });

    socket.on('casino.error', (payload) => {
      setErrors(payload);
    });
  }, [errors]);

  // const emitEvent = async (eventName, payload) => {
  //   await socket.emit(eventName, payload, (confirmation) => {
  //     console.log(confirmation);

  //     dispatch(addPlayer(confirmation.player));

  //     setMessage(confirmation);

  //     if (confirmation.status && confirmation.type === 'login') {
  //       setIsLoggedIn(!isLoggedIn);
  //     }
  //   });
  // };

  const emitEvent = async (eventName, payload) => {
    await socket.emit(eventName, payload);

    socket.on('loggedIn', (payload) => {
      // console.log(payload);
      dispatch(addTable(payload.tableID));
    });
  };

  /*   const emitEvent = async (eventName, payload) => {
    await socket.emit(eventName, (payload) => {
      socket.on('loggedIn', (res) => {
        console.log(res);
      });
    });
  }; */

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
