import { createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../helpers/baseUrl';

import { addTable } from '../Table/tableSlice';

import Axios from 'axios';

export const login = (values) => (dispatch) => {
  Axios.post(`${BASE_URL}/login`, values)
    .then((res) => {
      dispatch(loginSuccess(res.data.player));
      dispatch(addTable(res.data.table));
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const loginName = 'login';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
    player: {},
    error: '',
    socketId: '',
  },
  reducers: {
    loginSuccess: (state, { payload }) => {
      state.isLoggedIn = true;
      state.player = payload;
    },
    setErrors: (state, { payload }) => {
      state.error = payload;
    },
    setSocketId: (state, { payload }) => {
      state.socketId = payload;
    },
    setCards: (state, { payload }) => {
      state.player.cards = payload;
    },
    setDecision: (state, { payload }) => {
      state.player.decisions = payload;
    },
  },
});

export const {
  loginSuccess,
  setErrors,
  setSocketId,
  setCards,
  setDecision,
} = loginSlice.actions;

export const selectLoginState = (state) => state.login.isLoggedIn;

export const selectError = (state) => state.login.error;

export const selectPlayer = (state) => state.login.player;

export const selectPlayerId = (state) => state.login.player.id;

export const selectPlayerCards = (state) => state.login.player.cards;

export const selectSocketId = (state) => state.login.socketId;

export default loginSlice.reducer;
