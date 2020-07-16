import React from 'react';

import { Alert } from '@material-ui/lab';

import './Alerter.css';

const Alerter = ({ type, msg }) => {
  // type can be:
  // error, warning, info, success

  return (
    <Alert className="alerter" variant="outlined" severity={type}>
      {msg}
    </Alert>
  );
};

export default Alerter;
