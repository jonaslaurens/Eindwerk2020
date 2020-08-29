import React, { useState, useEffect, createContext } from 'react';

import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

import {
  setCards,
  setDecision,
  updateCredits,
  loginSuccess,
} from '../../components/Login/loginSlice';

import {
  updateTable,
  setCommunityCards,
  updatePot,
  updatePlayerCredits,
  addTable,
} from '../../components/Table/tableSlice';

import { setError } from '../../reducers/AlertSlice';

// init context
export const WSContext = createContext();

// socket provider
export const WSProvider = (props) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    addListeners();
  }, [socket]);

  const addListeners = () => {
    let won = false;

    if (socket === null) return;

    socket.on('loggedIn', (payload) => {
      dispatch(loginSuccess(payload.player));
      dispatch(addTable(payload.table));
    });

    socket.on('loginError', (payload) => {
      dispatch(setError(payload));
    });

    socket.on('handCards', (payload) => {
      return dispatch(setCards(payload));
    });

    socket.on('endgame', (payload) => {
      won = true;
      toast.success(payload.message, {
        pauseOnHover: true,
        progress: undefined,
      });
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

        case 'grandWinner':
          toast.info(payload.message, {
            pauseOnHover: true,
            progress: undefined,
          });
          break;

        // handle end game
        case 'endgame':
          if (won) {
            won = false;
          } else {
            toast.warn(`${payload.message}`, {
              pauseOnHover: true,
              progress: undefined,
            });
          }
          break;
        default:
          toast.warn(`something went wrong..`, {
            pauseOnHover: true,
            progress: undefined,
          });
      }
    });
  };

  // emits events based on the eventName param with data inside the payload param
  const emitEvent = (eventName, payload) => {
    socket.emit(eventName, payload);
  };

  return (
    <WSContext.Provider
      value={{
        emitEvent,
        setSocket,
      }}
    >
      {props.children}
    </WSContext.Provider>
  );
};
