import React from 'react';
import { useSelector } from 'react-redux';

import { selectTable } from './tableSlice';
import { selectPlayer, selectPlayerName } from '../Login/loginSlice';
import { selectError } from '../Alerter/AlertSlice';

import './Table.css';

import Player from '../Player/Player';
import Decisions from '../Decisions/Decisions';
import Alerter from '../Alerter/Alerter';
import Card from '../Card/Card';

const Table = () => {
  const table = useSelector(selectTable);
  const selectedPlayer = useSelector(selectPlayer);
  const error = useSelector(selectError);

  const renderCommunityCards = () => {
    if (table.hasOwnProperty('communityCards')) {
      return table.communityCards.map((card) => (
        <Card
          key={card.value + card.suit}
          value={card.value}
          suit={card.suit}
        />
      ));
    }
  };

  const renderError = (type, message) => {
    return <Alerter type={type} msg={message} />;
  };

  return (
    <>
      {error ? renderError(error.type, error.message) : null}
      {/* {error && <Alerter type={error.type} msg={error.message} />} */}
      <div className="table">
        <div className="cards">{renderCommunityCards()}</div>
        <div className="pot">
          Pot:&nbsp;<span>{table.pot ? table.pot : 0}</span>
        </div>
        <div className="players">
          <Player {...selectedPlayer} key={selectedPlayer.id} index={1} />
          {table.hasOwnProperty('players')
            ? table.players.map((player, index) => (
                <Player {...player} key={player.id} index={index + 2} />
              ))
            : null}
        </div>
      </div>
      {selectedPlayer.decisions && (
        <Decisions decisions={selectedPlayer.decisions} />
      )}
    </>
  );
};

export default Table;
