import React from 'react';

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
    </div>
  );
};

export default Player;
