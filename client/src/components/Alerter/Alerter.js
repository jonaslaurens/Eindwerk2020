import React from 'react';

import { Alert } from '@material-ui/lab';

const Alerter = ({ type, msg }) => {
  // type can be:
  // error, warning, info, success

  return (
    <Alert variant="outlined" severity={type}>
      {msg}
    </Alert>
  );
};

export default Alerter;
