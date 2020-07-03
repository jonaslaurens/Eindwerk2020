import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectPlayer } from '../Login/slice';
import { selectTable } from '../Table/slice';

import './Table.css';

import Player from '../Player/index';

const Table = () => {
  const player = useSelector(selectPlayer);
  const table = useSelector(selectTable);

  useEffect(() => {
    if (table.hasOwnProperty) {
      console.log(table);
    }
  }, [table]);

  return (
    <div className="table">
      <div className="cards"></div>
      <div className="players">
        {table.hasOwnProperty('players')
          ? table.players.map((player) => (
              <Player {...player} key={player.id} />
            ))
          : null}
      </div>
    </div>
  );
};

export default Table;
