import React from 'react';
import Card from '../Card/Card';

import './Player.css';

const Player = (props) => {
  return (
    <div className={'player player-' + props.index}>
      <div className="bank">
        <div className="bankValue">{props.credits}</div>
      </div>
      <div className="avatar"></div>
      <div className="name" style={{ backgroundColor: 'dodgerblue' }}>
        {props.name}
      </div>
      <div className="player-cards">
        <Card value="10" suit="Hearts" player={false} />
        <Card value="J" suit="Hearts" />
      </div>
    </div>
  );
};

export default Player;
