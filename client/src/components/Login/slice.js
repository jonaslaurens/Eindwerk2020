import { createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../helpers/baseUrl';

import { addTable } from '../Table/slice';

import Axios from 'axios';

export const login = (values) => (dispatch) => {
  Axios.post(`${BASE_URL}/login`, values)
    .then((res) => {
      dispatch(loginSuccess(res.data.player));
      dispatch(addTable(res.data.table));
    })
    .catch((err) => {
      // set errors
      console.log(err.response.data);

      const errMsg = JSON.stringify(err.response.data);

      dispatch(setErrors(errMsg));
    });
};

export const loginName = 'login';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
    player: {},
    error: {},
  },
  reducers: {
    loginSuccess: (state, { payload }) => {
      state.isLoggedIn = true;
      state.error = {};
      state.player = payload;
    },
    setErrors: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { loginSuccess, setErrors } = loginSlice.actions;

export const selectFormValues = (state) => state.login.formValues;

export const selectLoginState = (state) => state.login.isLoggedIn;

export const selectErrors = (state) => state.login.errors;

export default loginSlice.reducer;
