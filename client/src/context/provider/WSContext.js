import React, { useState, useEffect, createContext } from 'react';
import io from 'socket.io-client';
import { BASE_URL } from '../../helpers/baseUrl';

import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

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
  const playerName = useSelector((state) => state.login.player.name);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  console.log(playerName);

  useEffect(() => {
    socket.on('connected', (payload) => {
      return dispatch(setSocketId(payload));
    });

    socket.on('handCards', (payload) => {
      return dispatch(setCards(payload));
    });

    socket.on('casinoError', (payload) => {
      enqueueSnackbar(payload.message, { variant: 'warning' });
    });

    socket.on('decision', (payload) => {
      enqueueSnackbar(payload.message, { variant: 'warning' });
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
          enqueueSnackbar(payload.message, {
            variant: 'info',
          });
          break;

        // TODO: case END GAME
        case 'endgame':
          console.log(playerName);

          if (payload.winner === playerName) {
            enqueueSnackbar(payload.message, {
              variant: 'success',
            });
          } else {
            enqueueSnackbar(payload.message, {
              variant: 'warning',
            });
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
