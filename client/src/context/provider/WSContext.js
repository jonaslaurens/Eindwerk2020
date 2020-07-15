import React, { useEffect, createContext } from 'react';
import io from 'socket.io-client';
import { BASE_URL } from '../../helpers/baseUrl';

import { useDispatch } from 'react-redux';

import {
  setSocketId,
  setCards,
  setDecision,
  updateCredits,
} from '../../components/Login/loginSlice';

import {
  updateTable,
  setCommunityCards,
  updatePot,
  updatePlayerCredits,
} from '../../components/Table/tableSlice';

import { setError } from '../../components/Alerter/AlertSlice';

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
      dispatch(setError(payload));
    });

    socket.on('decision', (payload) => {
      dispatch(setDecision(payload));
    });

    socket.on('seated', (payload) => {
      // when player is given a seat at a table
      // try starting a game
      socket.emit('startGame', payload);
    });

    socket.on('credits', (payload) => {
      // update table pot
      dispatch(updatePot(payload.pot));
      // update table player credits
      dispatch(updatePlayerCredits(payload.tablePlayerCredits));

      // update player credits
      dispatch(updateCredits(payload.playerCredits));
    });

    //handle broadcast emits
    socket.on('broadcast', (payload) => {
      switch (payload.type) {
        // handle new player added
        case 'newPlayerAdded':
          if (payload.table.hasOwnProperty('players')) {
            dispatch(setError(''));
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

  // emits events based on the eventName param with data inside the payload param
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
