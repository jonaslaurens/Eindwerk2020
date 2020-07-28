import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectTableId } from '../Table/tableSlice';
import { setDecision } from '../../components/Login/loginSlice';

import { Button } from '@material-ui/core';

import './Decisions.css';

import { WSContext } from '../../context/provider/WSContext';
import { setError } from '../../reducers/AlertSlice';

const Decisions = () => {
  const { emitEvent } = useContext(WSContext);
  const dispatch = useDispatch();
  const tableId = useSelector(selectTableId);

  const handleClick = (action) => {
    const decision = {
      table: tableId,
      decision: action,
      amount: action === 'raise' ? 100 : '',
    };
    // handle it
    dispatch(setError(''));
    emitEvent('decision', decision);
    dispatch(setDecision(false));
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
