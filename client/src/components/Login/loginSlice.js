import { createSlice } from '@reduxjs/toolkit';

import { isValidLogin } from './loginValidation';

import { setError } from '../../reducers/AlertSlice';

import io from 'socket.io-client';

export const login = (values, setSocket) => (dispatch) => {
  // validate inputs
  const { errors, isValid } = isValidLogin(values);

  if (!isValid) {
    dispatch(setError(errors));
  } else {
    const socket = io.connect(values.casinoServer, { reconnection: false });

    // if connected handle connection
    socket.on('connected', () => {
      // set global socket
      setSocket(socket);

      // emit login event
      socket.emit('login', values);
    });

    // handle failed connection
    socket.on('connect_error', (error) => {
      dispatch(setError({ casinoServer: 'wrong adress' }));
    });
  }
};

export const loginName = 'login';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
    player: {},
    error: '',
  },
  reducers: {
    loginSuccess: (state, { payload }) => {
      state.isLoggedIn = true;
      state.player = payload;
    },
    setCards: (state, { payload }) => {
      state.player.cards = payload;
    },
    setDecision: (state, { payload }) => {
      state.player.decisions = payload;
    },
    updateCredits: (state, { payload }) => {
      state.player.credits = payload;
    },
  },
});

export const {
  loginSuccess,
  setCards,
  setDecision,
  updateCredits,
} = loginSlice.actions;

export const selectLoginState = (state) => state.login.isLoggedIn;

export const selectPlayer = (state) => state.login.player;

export default loginSlice.reducer;
