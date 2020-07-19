import React, { useState, useEffect } from 'react';

import { Alert } from '@material-ui/lab';

import './Alerter.css';

const Alerter = ({ type, msg }) => {
  // type can be:
  // error, warning, info, success

  const [isShowing, setIsShowing] = useState(true);

  useEffect(() => {
    console.log(typeof type);
    console.log(msg);

    let timer;
    if (type !== 'warning') {
      timer = setTimeout(() => setIsShowing(false), 2000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, []);

  /*   return (
    <Alert className="alerter" variant="outlined" severity={type}>
      {msg}
    </Alert>
  ); */
  return isShowing ? (
    <Alert className="alerter" variant="outlined" severity={type}>
      {msg}
    </Alert>
  ) : null;
};

export default Alerter;
