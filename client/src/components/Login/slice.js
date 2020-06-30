import { createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../helpers/baseUrl';
import io from 'socket.io-client';

export const loginName = 'login';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    formValues: {},
    isLoggedIn: false,
  },
  reducers: {
    submitValues: (state, { payload }) => {
      state.formValues = payload;

      const socket = io(BASE_URL);

      socket.emit('login', state.formValues);

      socket.on('casino.error', console.log);

      state.isLoggedIn = true;
    },
  },
});

export const { submitValues } = loginSlice.actions;

export const selectFormValues = (state) => state.login.formValues;

export const selectIsLoggedIn = (state) => state.login.isLoggedIn;

export default loginSlice.reducer;
