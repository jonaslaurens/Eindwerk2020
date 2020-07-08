import React from 'react';

import './Card.css';

const Card = ({ value, suit }) => {
  if (!value) {
    return <div className="card back"></div>;
  }

  return (
    <div className="card">
      <h6>{value}</h6>
      <div
        className={`suit ${suit.toLowerCase()} suit-${suit.toLowerCase()} `}
      ></div>
      <h6>{value}</h6>
    </div>
  );
};

export default Card;
