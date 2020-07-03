import { createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../helpers/baseUrl';
import Axios from 'axios';

export const tableName = 'table';

export const getData = (id) => (dispatch) => {
  Axios.get(`${BASE_URL}/table/${id}`).then((res) => console.log(res.data));
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
  },
});

export const { addTable } = tableSlice.actions;

export const selectId = (state) => state.table.table.id;

export default tableSlice.reducer;
