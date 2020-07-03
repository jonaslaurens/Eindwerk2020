import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { login, selectError } from './slice';

// material UI
import {
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const INITIAL_STATE = {
  name: '',
  casinoServer: '',
  secretCode: '',
};

const useStyles = makeStyles((theme) => ({
  login: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100%',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginPage = () => {
  const classes = useStyles();

  const [formValues, setFormValues] = useState(INITIAL_STATE);

  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(login(formValues));
  };

  console.log(error);

  return (
    <div className={classes.login}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formValues.name}
              onChange={handleChange}
              error={error.name ? true : false}
              helperText={error ? error.name : null}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="casinoServer"
              label="Casino Server"
              type="text"
              id="casinoServer"
              autoComplete="casinoServer"
              value={formValues.casinoServer}
              onChange={handleChange}
              error={error.casinoServer ? true : false}
              helperText={error ? error.casinoServer : null}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="secretCode"
              label="Secret code"
              type="password"
              id="secretCode"
              autoComplete="secretCode"
              value={formValues.secretCode}
              onChange={handleChange}
              error={error.secretCode ? true : false}
              helperText={error ? error.secretCode : null}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
