import React from 'react';

import './Player.css';

const Player = ({ name, credits }) => {
  return (
    <div className="player player-1">
      <div className="bank">
        <div className="bankValue">{credits}</div>
      </div>
      <div className="avatar"></div>
      <div className="name" style={{ backgroundColor: 'dodgerblue' }}>
        {name}
      </div>
    </div>
  );
};

export default Player;
