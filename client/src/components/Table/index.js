import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectPlayer } from '../Login/slice';
import { selectTable, getData, selectId } from '../Table/slice';

import './Table.css';

import Player from '../Player/index';

const Table = () => {
  const table = useSelector(selectTable);

  return (
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
  );
};

export default Table;
