import { createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../helpers/baseUrl';
import Axios from 'axios';

export const tableName = 'table';

export const getData = (id) => (dispatch) => {
  Axios.get(`${BASE_URL}/table/${id}`).then((res) => {
    dispatch(checkPlayers(res.data));
  });
};

export const tableSlice = createSlice({
  name: 'table',
  initialState: {
    table: {},
  },
  reducers: {
    addTable: (state, { payload }) => {
      if (state.table.id !== payload) {
        state.table = payload;
      }
    },
    checkPlayers: (state, { payload }) => {
      let difference = payload.players.filter(
        (x) => !state.table.players.includes(x)
      );
      state.table.players = difference;
    },
  },
});

export const { addTable, checkPlayers } = tableSlice.actions;

export const selectTable = (state) => state.table.table;

export const selectId = (state) => state.table.table.id;

export default tableSlice.reducer;
