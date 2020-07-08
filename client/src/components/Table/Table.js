import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';

import { selectTable } from './slice';
import { selectPlayer } from '../Login/slice';

import './Table.css';

import Player from '../Player/Player';
import Decisions from '../Decisions/Decisions';
import Alerter from '../Alerter/Alerter';
import Card from '../Card/Card';

const Table = () => {
  const table = useSelector(selectTable);
  const selectedPlayer = useSelector(selectPlayer);

  return (
    <>
      <Alerter type="info" msg="Waiting for more players" />
      <div className="table">
        <div className="cards">
          {/* render community cards from table */}
          <Card value="10" suit="Hearts" />
          <Card value="J" suit="Hearts" />
          <Card value="Q" suit="Hearts" />
          <Card value="K" suit="Hearts" />
          <Card value="A" suit="Hearts" />
        </div>
        <div className="players">
          {/* render player -> get info from login*/}
          <Player {...selectedPlayer} key={selectedPlayer.id} index={1} />
          {/* render rest of the players -> get info from table*/}
          {table.hasOwnProperty('players')
            ? table.players.map((player, index) => (
                <Player {...player} key={player.id} index={index + 2} />
              ))
            : null}
        </div>
      </div>
      <Decisions />
    </>
  );
};

export default Table;
