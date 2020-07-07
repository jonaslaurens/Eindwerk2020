import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';

import { selectTable } from './slice';
import { selectPlayer } from '../Login/slice';

import { WSContext } from '../../context/provider/WSContext';

import './Table.css';

import Player from '../Player/Player';
import Decisions from '../Decisions/Decisions';
import Alerter from '../Alerter/Alerter';
import Card from '../Card/Card';

const Table = () => {
  const table = useSelector(selectTable);
  const player = useSelector(selectPlayer);

  // const { emitEvent } = useContext(WSContext);

  const [index, setIndex] = useState(1);

  /*   useEffect(() => {
    if (table.id) {
      const data = {
        tableId: table.id,
        playerId: player.id,
      };

      emitEvent('tableInfo', data);
    }
  }, [table.id]); */

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
          <Player {...player} key={player.id} index={index} />
          {/* render rest of the players -> get info from table*/}
          {table.hasOwnProperty('players')
            ? table.players.map((player, index) => (
                <Player {...player} key={player.id} index={2} />
              ))
            : null}
        </div>
      </div>
      <Decisions />
    </>
  );
};

export default Table;
