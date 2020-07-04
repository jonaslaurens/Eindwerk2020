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

  const dispatch = useDispatch();

  useEffect(() => {
    // message listener?
    socket.on('message', (payload) => {
      setMessage(payload);
    });

    // broadcast listener?
    socket.on('broadcast', (payload) => {
      console.log(payload);
    });
  }, [errors]);

  // set emit events here
  const emitEvent = async (eventName, payload) => {
    await socket.emit(eventName, payload);

    socket.on('loggedIn', (payload) => {
      dispatch(addTable(payload.tableID));
    });
  };

  return (
    <WSContext.Provider
      value={{
        message,
        emitEvent,
      }}
    >
      {props.children}
    </WSContext.Provider>
  );
};
