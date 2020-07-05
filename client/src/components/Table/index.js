import React from 'react';
import { useSelector } from 'react-redux';

import { selectTable } from '../Table/slice';

import './Table.css';

import Player from '../Player/index';
import Decisions from '../Decisions';
import Alerter from '../Alerter';

const Table = () => {
  const table = useSelector(selectTable);

  return (
    <>
      <Alerter type="info" msg="Waiting for more players" />
      <div className="table">
        <div className="cards"></div>
        <div className="players">
          {table.hasOwnProperty('players')
            ? table.players.map((player, index) => (
                <Player {...player} key={player.id} index={index + 1} />
              ))
            : null}
        </div>
      </div>
      <Decisions />
    </>
  );
};

export default Table;
