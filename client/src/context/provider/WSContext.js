import React, { useEffect, createContext } from 'react';
import io from 'socket.io-client';
import { BASE_URL } from '../../helpers/baseUrl';

import { useDispatch } from 'react-redux';

import {
  setSocketId,
  setCards,
  setErrors,
  setDecision,
} from '../../components/Login/loginSlice';
import {
  updateTable,
  setCommunityCards,
} from '../../components/Table/tableSlice';

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
      dispatch(setCards(payload));
    });

    socket.on('casinoError', (payload) => {
      dispatch(setErrors(payload));
    });

    socket.on('decision', (payload) => {
      dispatch(setDecision(payload));
    });

    socket.on('seated', (payload) => {
      // when player is given a seat at a table
      // try starting a game
      socket.emit('startGame', payload);
    });

    //handle broadcast emits
    socket.on('broadcast', (payload) => {
      switch (payload.type) {
        // handle new player added
        case 'newPlayerAdded':
          if (payload.table.hasOwnProperty('players')) {
            dispatch(setErrors(''));
            dispatch(updateTable(payload.table.players));
            socket.emit('startGame', payload.table.id);
          }
          break;

        // handle community cards
        case 'communityCards':
          dispatch(setCommunityCards(payload.cards));
          break;

        // TODO: case END GAME
        default:
          console.log('something went wrong..');
      }
    });
  }, []);

  const emitEvent = (eventName, payload) => {
    socket.emit(eventName, payload);
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
