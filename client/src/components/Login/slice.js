import { createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../helpers/baseUrl';

import Axios from 'axios';

export const login = (values) => (dispatch) => {
  Axios.post(`${BASE_URL}/login`, values)
    .then((res) => {
      console.log(res);

      dispatch(loginSuccess());
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
    },
    setErrors: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { loginSuccess, setErrors } = loginSlice.actions;

export const selectFormValues = (state) => state.login.formValues;

export default loginSlice.reducer;
