import React, { useState, useEffect, createContext } from 'react';
import io from 'socket.io-client';
import { BASE_URL } from '../../helpers/baseUrl';

import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

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
    let won = false;

    socket.on('connected', (payload) => {
      return dispatch(setSocketId(payload));
    });

    socket.on('handCards', (payload) => {
      return dispatch(setCards(payload));
    });

    socket.on('endgame', (payload) => {
      won = true;
    });

    socket.on('casinoError', (payload) => {
      toast.warn(payload.message, {
        pauseOnHover: true,
        progress: undefined,
      });
    });

    socket.on('decision', (payload) => {
      toast.warn(payload.message, {
        pauseOnHover: true,
        progress: undefined,
      });
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
          toast.info(payload.message, {
            pauseOnHover: true,
            progress: undefined,
          });
          break;

        // TODO: case END GAME
        case 'endgame':
          if (won) {
            toast.success('You won ', {
              pauseOnHover: true,
              progress: undefined,
            });
            won = false;
          } else {
            toast.warn(payload.message, {
              pauseOnHover: true,
              progress: undefined,
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
