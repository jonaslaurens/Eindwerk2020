import React from 'react';

import './Card.css';

const Card = ({ value, suit }) => {
  if (!value) {
    return <div className="card back"></div>;
  }

  const renderFaceCard = (val) => {
    switch (val) {
      case 11:
        val = 'J';
        break;
      case 12:
        val = 'Q';
        break;
      case 13:
        val = 'K';
        break;
      case 14:
        val = 'A';
        break;
    }
    return val;
  };

  return (
    <div className="card">
      <h6>{renderFaceCard(value)}</h6>
      <div className={`suit ${suit.toLowerCase()}`}></div>
      <h6>{renderFaceCard(value)}</h6>
    </div>
  );
};

export default Card;
