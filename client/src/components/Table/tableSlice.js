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
      state.table = payload;
    },
    updateTable: (state, { payload }) => {
      state.table.players = payload;
    },
    checkPlayers: (state, { payload }) => {
      let difference = payload.players.filter(
        (x) => !state.table.players.includes(x)
      );
      state.table.players = difference;
    },
    setCommunityCards: (state, { payload }) => {
      state.table.communityCards = payload;
    },
    updatePot: (state, { payload }) => {
      state.table.pot = payload;
    },
    updatePlayerCredits: (state, { payload }) => {
      state.table.players.forEach((tablePlayer) => {
        payload.forEach((player) => {
          if (tablePlayer.id === player.id) {
            tablePlayer.credits = player.credits;
          }
        });
      });
    },
  },
});

export const {
  addTable,
  checkPlayers,
  updateTable,
  setCommunityCards,
  updatePot,
  updatePlayerCredits,
} = tableSlice.actions;

export const selectTable = (state) => state.table.table;

export const selectTableId = (state) => state.table.table.id;

export default tableSlice.reducer;
