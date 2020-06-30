import { createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../helpers/baseUrl';
import io from 'socket.io-client';

export const loginName = 'login';

// TODO: try seperating the socket from the reducer

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    formValues: {},
    isLoggedIn: false,
    error: {},
  },
  reducers: {
    submitValues: (state, { payload }) => {
      state.formValues = payload;

      let errorMsg;

      const socket = io(BASE_URL);

      socket.emit('login', state.formValues);

      socket.on('message', console.log);

      state.isLoggedIn = true;

      socket.on('casino.error', (payload) => {
        const errorMsg = JSON.stringify(payload);
        // state.error = errorMsg;
        console.log(errorMsg);
      });

      console.log(errorMsg);

      // state.error = errorMsg;
      console.log(state.error);
    },
  },
});

export const { submitValues } = loginSlice.actions;

export const selectFormValues = (state) => state.login.formValues;

export const selectIsLoggedIn = (state) => state.login.isLoggedIn;

export default loginSlice.reducer;
