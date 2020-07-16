import React, { useState, useEffect, createContext } from 'react';
import io from 'socket.io-client';
import { BASE_URL } from '../../helpers/baseUrl';

import { useDispatch, useSelector } from 'react-redux';

import {
  setSocketId,
  setCards,
  setDecision,
  updateCredits,
  selectPlayerName,
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
  const playerName = useSelector(selectPlayerName);

  useEffect(() => {
    socket.on('connected', (payload) => {
      return dispatch(setSocketId(payload));
    });

    socket.on('handCards', (payload) => {
      return dispatch(setCards(payload));
    });

    socket.on('casinoError', (payload) => {
      console.log(payload);
      return dispatch(setError(payload));
    });

    socket.on('decision', (payload) => {
      dispatch(setError({ type: 'warning', message: payload.message }));
      return dispatch(setDecision(payload));
    });

    socket.on('credits', (payload) => {
      // update table pot
      dispatch(updatePot(payload.pot));
      // update table player credits
      dispatch(updatePlayerCredits(payload.tablePlayerCredits));

      // update player credits
      return dispatch(updateCredits(payload.playerCredits));
    });

    //handle broadcast emits
    socket.on('broadcast', (payload) => {
      switch (payload.type) {
        // handle new player added
        case 'newPlayerAdded':
          if (payload.table.hasOwnProperty('players')) {
            dispatch(setError(''));
            dispatch(updateTable(payload.table.players));
          }
          break;

        // handle community cards
        case 'communityCards':
          dispatch(setCommunityCards(payload.cards));
          dispatch(setError({ type: 'info', message: payload.message }));
          break;

        // TODO: case END GAME
        case 'endgame':
          if (payload.winner === playerName) {
            dispatch(setError({ type: 'success', message: payload.message }));
          } else {
            dispatch(setError({ type: 'warning', message: payload.message }));
          }
          break;
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
