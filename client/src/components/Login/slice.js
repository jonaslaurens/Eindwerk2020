import { createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../helpers/baseUrl';
import io from 'socket.io-client';

export const loginName = 'login';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    formValues: {},
    isLoggedIn: false,
    error: {},
  },
  reducers: {},
});

export const { submitValues } = loginSlice.actions;

export const selectFormValues = (state) => state.login.formValues;

export const selectIsLoggedIn = (state) => state.login.isLoggedIn;

export default loginSlice.reducer;
