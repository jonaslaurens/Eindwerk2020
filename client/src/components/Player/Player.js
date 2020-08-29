import React from 'react';
import Card from '../Card/Card';

import './Player.css';

const Player = (props) => {
  const renderPlayerCards = () => {
    if (!props.cards) {
      return (
        <>
          <Card />
          <Card />
        </>
      );
    }
    return props.cards.map((card) => (
      <Card key={card.value + card.suit} value={card.value} suit={card.suit} />
    ));
  };

  return (
    <div className={'player player-' + props.index}>
      <div className="bank">
        <div className="bankValue">{props.credits}</div>
      </div>
      <div className="avatar"></div>
      <div className="name" style={{ backgroundColor: 'dodgerblue' }}>
        {props.name}
      </div>
      <div className="player-cards">{renderPlayerCards()}</div>
    </div>
  );
};

export default Player;
