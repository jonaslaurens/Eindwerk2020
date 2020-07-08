import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import { selectTableId } from '../Table/tableSlice';

import { Button } from '@material-ui/core';

import './Decisions.css';

import { WSContext } from '../../context/provider/WSContext';

const Decisions = () => {
  const { emitEvent } = useContext(WSContext);
  const tableId = useSelector(selectTableId);

  const handleClick = (action) => {
    const decision = {
      table: tableId,
      decision: action,
      amount: 100,
    };
    // handle it
    emitEvent('decision', decision);
  };

  return (
    <div className="buttons">
      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={() => handleClick('call')}
      >
        Call
      </Button>
      <Button
        variant="contained"
        size="large"
        onClick={() => handleClick('raise')}
      >
        Raise
      </Button>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={() => handleClick('fold')}
      >
        Fold
      </Button>
    </div>
  );
};

export default Decisions;
