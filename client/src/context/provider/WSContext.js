import React, { useEffect, createContext } from 'react';
import io from 'socket.io-client';
import { BASE_URL } from '../../helpers/baseUrl';

import { useDispatch } from 'react-redux';

import { setSocketId, setCards } from '../../components/Login/slice';
import { updateTable } from '../../components/Table/slice';

// init socket
const socket = io(BASE_URL);
// init context
export const WSContext = createContext();

// socket provider
export const WSProvider = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('connected', (payload) => {
      dispatch(setSocketId(payload));
    });

    socket.on('handCards', (payload) => {
      console.log(payload);
      dispatch(setCards(payload));
    });

    //handle broadcast
    socket.on('broadcast', (payload) => {
      console.log(payload);

      switch (payload.type) {
        case 'newPlayerAdded':
          console.log(payload);

          if (payload.hasOwnProperty('players')) {
            dispatch(updateTable(payload.table.players));
          }
          break;

        // TODO: case END GAME
        default:
          console.log('something went wrong..');
      }
    });
  }, []);

  // set emit events here
  const emitEvent = async (eventName, payload) => {
    socket.emit(eventName, payload);

    /* socket.on('loggedIn', (payload) => {
      dispatch(addTable(payload.tableID));
    }); */
  };

  return (
    <WSContext.Provider
      value={{
        emitEvent,
      }}
    >
      {props.children}
    </WSContext.Provider>
  );
};
